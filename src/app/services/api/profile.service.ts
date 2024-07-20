import { inject, Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { Profile, User } from "@types";
import { lastValueFrom, map, tap } from "rxjs";
import { UserService } from "../state/user.service";

@Injectable()
export class ProfileService extends ApiService {
    private userService = inject(UserService);

    updateProfile(profile: { user: Partial<User> }): Promise<{ user: User }> {
        return lastValueFrom(
            this.http
                .put<{ user: User }>(`${this.baseUrl}/user`, profile, {
                    headers: this.headers.headers,
                })
                .pipe(
                    tap((data) => {
                        this.userService.user = data.user;
                    }),
                ),
        );
    }

    getProfile(username: Profile["username"]): Promise<Profile> {
        return lastValueFrom(
            this.http
                .get<{
                    profile: Profile;
                }>(`${this.baseUrl}/profiles/${username}`, {
                    headers: this.headers.headers,
                })
                .pipe(map((data) => data.profile)),
        );
    }
}
