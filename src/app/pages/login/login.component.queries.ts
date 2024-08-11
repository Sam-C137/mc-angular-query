import { injectMutation } from "@tanstack/angular-query-experimental";
import { inject } from "@angular/core";
import { AuthenticationService } from "@api";
import { Email } from "@types";

export function createLoginMutation() {
    const authenticationService = inject(AuthenticationService);

    return injectMutation((client) => ({
        mutationFn: (credentials: {
            user: {
                email: Email;
                password: string;
            };
        }) => authenticationService.login(credentials),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["articles"],
            });
        },
    }));
}
