import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    model,
} from "@angular/core";
import { UserService } from "@state";

@Component({
    selector: "mc-feed-header",
    standalone: true,
    imports: [],
    templateUrl: "./feed-header.component.html",
    styleUrl: "./feed-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedHeaderComponent {
    user = inject(UserService).user;
    isFeed = model<boolean>(false);
    tagFilter = input<string>();
}
