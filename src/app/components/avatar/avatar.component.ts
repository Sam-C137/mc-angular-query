import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ColorPipe, InitialsPipe } from "@pipes";
import { Optional } from "@types";

@Component({
    selector: "mc-avatar",
    standalone: true,
    imports: [InitialsPipe, ColorPipe],
    templateUrl: "./avatar.component.html",
    styleUrl: "./avatar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
    src = input.required<Optional<string>>();
    fallback = input.required<Optional<string>>();
}
