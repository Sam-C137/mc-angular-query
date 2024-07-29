import { injectMutation } from "@tanstack/angular-query-experimental";
import { inject } from "@angular/core";
import { AuthenticationService } from "@api";
import { Email } from "@types";

export function createRegisterMutation() {
    const authenticationService = inject(AuthenticationService);

    return injectMutation((client) => ({
        mutationFn: (credentials: {
            user: {
                username: string;
                email: Email;
                password: string;
            };
        }) => authenticationService.register(credentials),
    }));
}
