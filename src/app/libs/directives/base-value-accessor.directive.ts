import {
    Directive,
    Inject,
    Injector,
    input,
    OnDestroy,
    OnInit,
    signal,
} from "@angular/core";
import {
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    FormControlName,
    FormGroupDirective,
    NgControl,
} from "@angular/forms";
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from "rxjs";

@Directive({
    selector: "[mcBaseValueAccessor]",
    standalone: true,
})
export class BaseValueAccessorDirective<T>
    implements ControlValueAccessor, OnInit, OnDestroy
{
    public required = input<boolean>(false);
    private destroyer$ = new Subject<void>();

    constructor(@Inject(Injector) private injector: Injector) {}

    protected control?: FormControl;
    protected readonly value = signal<T | undefined>(undefined);
    protected readonly disabled = signal<boolean>(false);

    ngOnInit(): void {
        this.setFormControl();
    }

    setFormControl(): void {
        try {
            const formControl = this.injector.get(NgControl);
            switch (formControl.constructor) {
                case FormControlName:
                    this.control = this.injector
                        .get(FormGroupDirective)
                        .getControl(formControl as FormControlName);
                    break;
                default:
                    this.control = (formControl as FormControlDirective).form;
                    break;
            }
        } catch (e) {
            this.control = new FormControl();
        }
    }

    onChange = (value: T) => {};
    onTouch = () => {};

    writeValue(value: T): void {
        this.value.set(value);
        if (this.control) {
            this.control.setValue(value);
        } else {
            this.control = new FormControl(value);
        }
    }

    registerOnChange(fn: (value: T) => void): void {
        this.control?.valueChanges
            .pipe(
                startWith(this.control?.value),
                distinctUntilChanged(),
                tap((val) => fn(val)),
                tap(() => this.control?.markAsTouched()),
                takeUntil(this.destroyer$),
            )
            .subscribe();
    }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    ngOnDestroy(): void {
        this.destroyer$.next();
        this.destroyer$.complete();
    }
}
