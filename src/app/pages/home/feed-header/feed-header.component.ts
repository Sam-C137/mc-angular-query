import {
    ChangeDetectionStrategy,
    Component,
    inject,
    model,
} from "@angular/core";
import { UserService } from "@state";
import { Tag } from "@types";
import { TabComponent, TabItemComponent } from "@components";

@Component({
    selector: "mc-feed-header",
    standalone: true,
    imports: [TabComponent, TabItemComponent],
    templateUrl: "./feed-header.component.html",
    styleUrl: "./feed-header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedHeaderComponent {
    protected user = inject(UserService).user;
    public isFeed = model<boolean>(false);
    public extraTag = model<Tag>();
}
