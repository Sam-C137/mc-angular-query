import { injectMutation } from "@tanstack/angular-query-experimental";
import { User } from "@types";
import { inject } from "@angular/core";
import { ProfileService } from "@api";
import { Router } from "@angular/router";

export function createProfileMutation() {
    const profileService = inject(ProfileService);
    const router = inject(Router);

    return injectMutation(() => ({
        mutationFn: (profile: { user: Partial<User> }) =>
            profileService.updateProfile(profile),
        onSuccess: async (data) => {
            await router.navigate(["/profile", data.user.username]);
        },
    }));
}
