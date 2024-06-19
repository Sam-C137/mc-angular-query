import { inject } from "@angular/core";
import { UserService } from "../services/state/user.service";
import { Router } from "@angular/router";

export class AuthenticatedActions {
    private user = inject(UserService).user;
    private router = inject(Router);

    public isAuthenticated = Boolean(this.user);
}
