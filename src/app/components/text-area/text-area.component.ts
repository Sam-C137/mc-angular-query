import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    ReactiveFormsModule,
} from "@angular/forms";
import { PreventLeadingSpace } from "@directives";

@Component({
    selector: "mc-text-area",
    standalone: true,
    imports: [ReactiveFormsModule, PreventLeadingSpace],
    templateUrl: "./text-area.component.html",
    styleUrl: "./text-area.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
    inputId = input.required<string>();
    label = input<string>();
    placeholder = input<string>();
    rows = input<number>(8);
    control = input.required<AbstractControl | FormControl | any>();
    error = input<string>();
    required = input<boolean>();
}
