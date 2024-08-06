import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "@state";

export const authenticationGuard: CanActivateFn = (route, state) => {
    const user = inject(UserService).user;
    const router = inject(Router);

    if (user) {
        return true;
    }

    return router.navigate(["/login"]);
};
