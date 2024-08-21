import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";

export const popup = trigger("popup", [
    state("void", style({ opacity: 0, transform: "scale(0.9)" })),
    state("*", style({ opacity: 1, transform: "scale(1)" })),
    transition("void => *", animate("200ms cubic-bezier(0.4, 0, 0.2, 1)")),
    transition("* => void", animate("200ms cubic-bezier(0.4, 0, 0.2, 1)")),
]);
