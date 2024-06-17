import { Injectable, inject } from "@angular/core";
import { ApiService } from "@entities";
import { UserService } from "@state";
import { LoginUserResponse, SignUpUserDetails } from "@types";
import { catchError, lastValueFrom, tap } from "rxjs";

@Injectable()
export class RegisterService extends ApiService {
    private userService = inject(UserService);

    register(credentials: SignUpUserDetails): Promise<LoginUserResponse> {
        return lastValueFrom(
            this.http
                .post<LoginUserResponse>(
                    `${this.baseUrl}/users`,
                    credentials,
                    this.headers,
                )
                .pipe(
                    tap(async (response) => {
                        this.tokenService.set(response.user.token);
                        this.userService.user = response.user;
                        await this.router.navigate(["/"]);
                    }),
                    catchError((error) => this.onError(error)),
                ),
        );
    }
}
