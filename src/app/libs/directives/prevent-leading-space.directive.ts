import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: "[preventLeadingSpace]",
    standalone: true,
})
export class PreventLeadingSpace {
    @HostListener("keydown", ["$event"])
    handler(event: KeyboardEvent) {
        if (
            event.key === " " &&
            (event.target as HTMLInputElement).selectionStart === 0
        ) {
            event.preventDefault();
        }
    }
}
