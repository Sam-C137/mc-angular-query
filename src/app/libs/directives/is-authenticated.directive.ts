import { Directive, HostListener, inject, input } from "@angular/core";
import { UserService } from "@state";
import { Router } from "@angular/router";

@Directive({
    selector: "[mcIsAuthenticated]",
    standalone: true,
})
export class IsAuthenticatedDirective {
    clickHandler = input<(...args: unknown[]) => unknown>();
    private user = inject(UserService).user;
    private router = inject(Router);
    public isAuthenticated = Boolean(this.user);

    @HostListener("mousedown", ["$event"])
    private async handleClick(e: Event) {
        if (!this.isAuthenticated) {
            await this.router.navigate(["/login"]);
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        this.clickHandler()?.();
    }
}
