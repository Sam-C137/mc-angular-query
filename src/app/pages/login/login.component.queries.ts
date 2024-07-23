import { injectMutation } from "@tanstack/angular-query-experimental";
import { inject } from "@angular/core";
import { AuthenticationService } from "@api";


export function createLoginMutation() {
    const authenticationService = inject(AuthenticationService);

    return injectMutation((client) => ({
        mutationFn: (credentials: {
            user: {
                email: string;
                password: string;
            };
        }) => authenticationService.login(credentials),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
        },
    }));
}
