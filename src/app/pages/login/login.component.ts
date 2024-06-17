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
    title = "Login";

    private loginService = inject(LoginService);

    mutation = injectMutation((client) => ({
        mutationFn: (credentials: {
            user: {
                email: string;
                password: string;
            };
        }) => this.loginService.login(credentials),
    }));

    override setupForm() {
        return this.fb.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    submit() {
        if (this.form.valid || !this.mutation.isPending()) {
            this.mutation.mutate({
                user: this.form.value,
            });
        }
    }
}
