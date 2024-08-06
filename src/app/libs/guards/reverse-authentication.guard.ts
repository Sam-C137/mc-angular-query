import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "@state";


export const reverseAuthenticationGuard: CanActivateFn = (route, state) => {
    const user = inject(UserService).user;
    const router = inject(Router);

    if(!user) return true;

    return router.navigate(['']);
}
