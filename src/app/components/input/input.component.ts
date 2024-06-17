import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    ReactiveFormsModule,
} from "@angular/forms";
import { PreventLeadingSpace } from "@directives";

@Component({
    selector: "mc-input",
    standalone: true,
    imports: [ReactiveFormsModule, PreventLeadingSpace],
    templateUrl: "./input.component.html",
    styleUrl: "./input.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
    control = input<AbstractControl | FormControl | any>();
    class = input<string>();
    inputId = input.required<string>();
    type = input<"text" | "password" | "email" | "tel">("text");
    placeholder = input<string>("");
    name = input<string>();
    label = input<string>();
    iconLeftUrl = input<string>("");
    iconRightUrl = input<string>("");
    controlName = input<string>("");
    required = input<boolean>(false);
    autocomplete = input<string>("");
    error = input<string>();

    togglePasswordVisibility(element: HTMLInputElement) {
        if (this.type() === "password") {
            if (element?.type === "password") {
                element.type = "text";
            } else {
                element.type = "password";
            }
        }
    }
}
