import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    input,
} from "@angular/core";
import { HasDisabledStateDirective } from "@directives";

@Component({
    selector: "mc-button",
    standalone: true,
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: HasDisabledStateDirective,
            inputs: ["disabled"],
        },
    ],
})
export class ButtonComponent {
    type = input<"button" | "submit" | "reset">("button");
    loading = input<boolean | undefined | null>(false);
    private el = inject(ElementRef);
    private hasDisabled = inject(HasDisabledStateDirective, {
        optional: true,
    });

    @HostBinding("tabindex") tabindex = "0";

    @HostListener("click", ["$event"])
    handleClick() {
        if (this.hasDisabled?.disabled() || this.loading()) {
            return;
        }

        if (this.type() === "submit") {
            this.el.nativeElement
                .closest("form")
                ?.dispatchEvent(new Event("submit"));
        }
    }
}
