import { injectMutation, injectQuery } from "@tanstack/angular-query-experimental";
import { inject, Signal } from "@angular/core";
import { FollowersService, ProfileService } from "@api";


export function createProfileQuery(username: Signal<string>) {
    const profileService = inject(ProfileService);

    return injectQuery(() => ({
        queryKey: ["profile", username()],
        queryFn: () => profileService.getProfile(username()),
    }));
}

export function createProfileMutation() {
    const followersService = inject(FollowersService);

    return {
        follow: injectMutation((client) => ({
            mutationFn: (username: string) =>
                followersService.follow(username),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["profile"],
                });
                await client.invalidateQueries({
                    queryKey: ["article"],
                });
            },
        })),
        unfollow: injectMutation((client) => ({
            mutationFn: (username: string) =>
                followersService.unfollow(username),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["profile"],
                });
                await client.invalidateQueries({
                    queryKey: ["article"],
                });
            },
        })),
    };
}
