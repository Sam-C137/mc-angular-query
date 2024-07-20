import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { PreventLeadingSpace } from "@directives";
import { BaseValueAccessorDirective } from "../../libs/directives/base-value-accessor.directive";
import { NgIf } from "@angular/common";

@Component({
    selector: "mc-text-area",
    standalone: true,
    imports: [ReactiveFormsModule, PreventLeadingSpace, NgIf],
    templateUrl: "./text-area.component.html",
    styleUrl: "./text-area.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useClass: TextAreaComponent,
            multi: true,
        },
    ],
})
export class TextAreaComponent<T> extends BaseValueAccessorDirective<T> {
    inputId = input.required<string>();
    label = input<string>();
    placeholder = input<string>();
    rows = input<number>(8);
    error = input<string>();
}
