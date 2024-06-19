import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from "@angular/core";

@Component({
    selector: "mc-error-handler",
    standalone: true,
    imports: [],
    templateUrl: "./error-handler.component.html",
    styleUrl: "./error-handler.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandlerComponent {
    message = input<string>();
    retry = output<void>();
}
