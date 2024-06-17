import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Host,
    HostBinding,
    HostListener,
    inject,
    input,
} from "@angular/core";

@Component({
    selector: "mc-button",
    standalone: true,
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    type = input<"button" | "submit" | "reset">("button");
    disabled = input<boolean | undefined | null>(false);
    loading = input<boolean | undefined | null>(false);
    private el = inject(ElementRef);

    @HostBinding("attr.data-disabled")
    get isDisabled() {
        return this.disabled();
    }

    @HostListener("click", ["$event"])
    handleClick() {
        if (this.disabled() || this.loading()) {
            return;
        }

        if (this.type() === "submit") {
            this.el.nativeElement
                .closest("form")
                ?.dispatchEvent(new Event("submit"));
        }
    }
}
