import { ChangeDetectionStrategy, Component, inject, model } from "@angular/core";
import { UserService } from "@state";
import { Tag } from "@types";

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
    extraTag = model<Tag>();
}
