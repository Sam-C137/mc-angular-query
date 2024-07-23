import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { BaseValueAccessorDirective, PreventLeadingSpace } from "@directives";
import { NgIf } from "@angular/common";

@Component({
    selector: "mc-input",
    standalone: true,
    imports: [PreventLeadingSpace, ReactiveFormsModule, NgIf],
    templateUrl: "./input.component.html",
    styleUrl: "./input.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useClass: InputComponent,
            multi: true,
        },
    ],
})
export class InputComponent<T> extends BaseValueAccessorDirective<T> {
    inputId = input.required<string>();
    type = input<"text" | "password" | "email" | "tel">("text");
    placeholder = input<string>("");
    name = input<string>();
    label = input<string>();
    autocomplete = input<string>("");
    error = input<string>();
}
