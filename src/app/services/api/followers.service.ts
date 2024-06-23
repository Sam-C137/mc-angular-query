import { Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { Profile } from "@types";
import { catchError, lastValueFrom, map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FollowersService extends ApiService {
    follow(username: Profile["username"]): Promise<Profile> {
        return lastValueFrom(
            this.http
                .post<{ profile: Profile }>(
                    `${this.baseUrl}/profiles/${username}/follow`,
                    {},
                )
                .pipe(
                    map((data) => data.profile),
                    catchError((e) => this.onError(e)),
                ),
        );
    }

    unfollow(username: Profile["username"]): Promise<Profile> {
        return lastValueFrom(
            this.http
                .delete<{ profile: Profile }>(
                    `${this.baseUrl}/profiles/${username}/follow`,
                )
                .pipe(
                    map((data) => data.profile),
                    catchError((e) => this.onError(e)),
                ),
        );
    }
}
