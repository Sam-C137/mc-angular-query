import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostListener,
    inject,
    OnDestroy,
} from "@angular/core";

@Directive({
    selector: "[trapFocus]",
    standalone: true,
})
export class TrapFocusDirective implements AfterContentInit, OnDestroy {
    private elementRef = inject(ElementRef);
    private prevEl = document.activeElement as HTMLElement;

    ngAfterContentInit() {
        this.focusable().at(0)?.focus();
    }

    private focusable(): HTMLElement[] {
        return Array.from(
            this.elementRef.nativeElement.querySelectorAll(
                "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
            ),
        );
    }

    @HostListener("keydown", ["$event"])
    private handleKeydown(event: KeyboardEvent) {
        if (event.key !== "Tab") return;

        const current = document.activeElement;
        const elements = this.focusable();
        const first = elements.at(0);
        const last = elements.at(-1);

        if (event.shiftKey && current === first) {
            last?.focus();
            event.preventDefault();
        } else if (!event.shiftKey && current === last) {
            first?.focus();
            event.preventDefault();
        }
    }

    ngOnDestroy() {
        this.prevEl?.focus();
    }
}
