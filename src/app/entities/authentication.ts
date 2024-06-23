import { inject } from "@angular/core";
import { UserService } from "@state";
import { Router } from "@angular/router";

export class AuthenticatedActions {
    user = inject(UserService).user;
    router = inject(Router);

    public isAuthenticated = Boolean(this.user);
}
