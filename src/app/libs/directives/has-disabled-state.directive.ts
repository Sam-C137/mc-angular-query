import { Directive, HostBinding, HostListener, input } from "@angular/core";

@Directive({
    selector: "[mcHasDisabledState]",
    standalone: true,
})
export class HasDisabledStateDirective {
    disabled = input<boolean>(false);

    @HostBinding("attr.data-disabled")
    get isDisabled() {
        return this.disabled();
    }

    @HostListener("click", ["$event"])
    @HostListener("dblclick", ["$event"])
    stopPropagation(e: Event) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }

}
