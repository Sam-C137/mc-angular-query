import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent, InputComponent } from "@components";
import { Title } from "@decorators";
import { MCForm } from "@entities";
import { AuthenticationService } from "@api";
import { createLoginMutation } from "./login.component.queries";

@Component({
    selector: "mc-login",
    standalone: true,
    imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AuthenticationService],
})
export class LoginComponent extends MCForm {
    @Title
    readonly title = "Login";
    protected readonly loginMutation = createLoginMutation();

    override setupForm() {
        return this.fb.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    public submit() {
        if (this.form.valid || !this.loginMutation.isPending()) {
            this.loginMutation.mutate({
                user: this.form.value,
            });
        }
    }
}
