import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FollowersService, ProfileService } from "@api";
import { AvatarComponent, SpinnerComponent } from "@components";
import { UserService } from "@state";
import {
    injectMutation,
    injectQuery,
} from "@tanstack/angular-query-experimental";

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
    private username = "";
    private profile = inject(ProfileService);
    private followersService = inject(FollowersService);

    constructor() {
        this.route.params.subscribe((params) => {
            this.username = params["username"];
        });
    }

    protected readonly profileQuery = injectQuery(() => ({
        queryKey: ["profile", this.username],
        queryFn: () => this.profile.getProfile(this.username),
    }));

    protected readonly followMutation = injectMutation((client) => ({
        mutationFn: (username: string) =>
            this.followersService.follow(username),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["profile", this.username],
            });
            await client.invalidateQueries({
                queryKey: ["article"],
            });
        },
    }));

    protected readonly unfollowMutation = injectMutation((client) => ({
        mutationFn: (username: string) =>
            this.followersService.unfollow(username),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["profile", this.username],
            });
            await client.invalidateQueries({
                queryKey: ["article"],
            });
        },
    }));
}
