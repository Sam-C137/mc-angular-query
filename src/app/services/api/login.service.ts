import { Injectable, inject } from "@angular/core";
import { ApiService } from "@entities";
import { LoginUserDetails, LoginUserResponse } from "@types";
import { lastValueFrom, tap } from "rxjs";
import { UserService } from "../state/user.service";

@Injectable()
export class LoginService extends ApiService {
    private userService = inject(UserService);

    public login(credentials: LoginUserDetails): Promise<LoginUserResponse> {
        return lastValueFrom(
            this.http
                .post<LoginUserResponse>(
                    `${this.baseUrl}/users/login`,
                    credentials,
                    this.headers,
                )
                .pipe(
                    tap(async (response) => {
                        this.tokenService.set(response.user.token);
                        this.userService.user = response.user;
                        await this.router.navigate(["/"]);
                    }),
                ),
        );
    }
}
