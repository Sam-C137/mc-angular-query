import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FollowersService, ProfileService } from "@api";
import { AvatarComponent, SpinnerComponent } from "@components";
import { UserService } from "@state";
import {
    createProfileMutation,
    createProfileQuery,
} from "./profile-banner.component.queries";

@Component({
    selector: "mc-profile-banner",
    standalone: true,
    imports: [AvatarComponent, SpinnerComponent, RouterLink],
    templateUrl: "./profile-banner.component.html",
    styleUrl: "./profile-banner.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProfileService, FollowersService],
})
export class ProfileBannerComponent {
    protected user = inject(UserService).user;
    private route = inject(ActivatedRoute);
    private username = signal<string>("");
    protected readonly profileQuery = createProfileQuery(this.username);
    protected readonly followMutation;
    protected readonly unfollowMutation;

    constructor() {
        this.route.params.subscribe((params) => {
            this.username.set(params["username"]);
        });
        const { follow, unfollow } = createProfileMutation();
        this.followMutation = follow;
        this.unfollowMutation = unfollow;
    }
}
