import { inject, Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { UserService } from "@state";
import { LoginUserDetails, LoginUserResponse, SignUpUserDetails } from "@types";
import { lastValueFrom, tap } from "rxjs";

@Injectable()
export class AuthenticationService extends ApiService {
    private userService = inject(UserService);

    login(credentials: LoginUserDetails): Promise<LoginUserResponse> {
        return lastValueFrom(
            this.http
                .post<LoginUserResponse>(
                    `${this.baseUrl}/users/login`,
                    credentials,
                    this.headers,
                )
                .pipe(tap(this.navigateToHome)),
        );
    }

    register(credentials: SignUpUserDetails): Promise<LoginUserResponse> {
        return lastValueFrom(
            this.http
                .post<LoginUserResponse>(
                    `${this.baseUrl}/users`,
                    credentials,
                    this.headers,
                )
                .pipe(tap(this.navigateToHome)),
        );
    }

    private navigateToHome = async (response: LoginUserResponse) => {
        this.tokenService.set(response.user.token);
        this.userService.user = response.user;
        await this.router.navigate(["/"]);
    };
}
