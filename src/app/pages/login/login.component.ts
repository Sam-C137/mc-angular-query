import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LoginService } from "@api";
import { ButtonComponent, InputComponent } from "@components";
import { Title } from "@decorators";
import { MCForm } from "@entities";
import { injectMutation } from "@tanstack/angular-query-experimental";

@Component({
    selector: "mc-login",
    standalone: true,
    imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LoginService],
})
export class LoginComponent extends MCForm {
    @Title
    readonly title = "Login";

    private loginService = inject(LoginService);

    protected readonly registerMutation = injectMutation((client) => ({
        mutationFn: (credentials: {
            user: {
                email: string;
                password: string;
            };
        }) => this.loginService.login(credentials),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
        },
    }));

    override setupForm() {
        return this.fb.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    public submit() {
        if (this.form.valid || !this.registerMutation.isPending()) {
            this.registerMutation.mutate({
                user: this.form.value,
            });
        }
    }
}
