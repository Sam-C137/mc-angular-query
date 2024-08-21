import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    model,
    output,
    TemplateRef,
    ViewEncapsulation,
} from "@angular/core";
import { popup } from "@animations";
import { TrapFocusDirective } from "@directives";
import { NgTemplateOutlet } from "@angular/common";

@Component({
    selector: "mc-dialog",
    standalone: true,
    imports: [TrapFocusDirective, NgTemplateOutlet],
    templateUrl: "./dialog.component.html",
    styleUrl: "./dialog.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [popup],
    encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements AfterContentInit {
    private elementRef = inject(ElementRef);
    public open = model.required<boolean>();
    public onCancel = output<void>();
    public onConfirm = output<void>();
    protected closeBtn = contentChild<TemplateRef<unknown>>("closeButton");
    @HostBinding("role") role = "dialog";

    ngAfterContentInit() {
        this.handleCancelClick();
        this.handleConfirmClick();
    }

    @HostBinding("class")
    get classNames() {
        return ["screen-fit"].join(" ");
    }

    @HostListener("click", ["$event"])
    private handleClick(e: Event) {
        if (e.target === this.elementRef.nativeElement) {
            this.open.set(false);
        }
    }

    @HostListener("keydown", ["$event"])
    private handleEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
            this.open.set(false);
        }
    }

    private handleCancelClick() {
        const cancelButton = this.elementRef.nativeElement.querySelector(
            "[cancelButton]",
        ) as HTMLButtonElement | undefined;

        if (cancelButton) {
            cancelButton.onclick = () => {
                this.onCancel.emit();
                this.open.set(false);
            };
        }
    }

    private handleConfirmClick() {
        const confirmButton = this.elementRef.nativeElement.querySelector(
            "[confirmButton]",
        ) as HTMLButtonElement | undefined;

        if (confirmButton) {
            confirmButton.onclick = () => {
                this.onConfirm.emit();
            };
        }
    }
}
