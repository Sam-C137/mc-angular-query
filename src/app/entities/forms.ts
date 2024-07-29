import { inject } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
} from "@angular/forms";
import { FormValidator } from "@utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export abstract class BaseForm<
    T extends {
        [key: string]: FormControl;
    } = {},
> {
    protected fb = inject(FormBuilder);
    protected nfb = inject(NonNullableFormBuilder);
    protected form: FormGroup<T>;
    protected formValidator: FormValidator;

    constructor() {
        this.form = this.setupForm();
        this.formValidator = new FormValidator(this.form);
        this.form.valueChanges.pipe(takeUntilDestroyed());
    }

    abstract setupForm(): FormGroup<T>;
}
