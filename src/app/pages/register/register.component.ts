import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent, InputComponent } from "@components";
import { MCForm } from "@entities";
import { Title } from "@decorators";
import { AuthenticationService } from "@api";
import { createRegisterMutation } from "./register.component.queries";

@Component({
    selector: "mc-register",
    standalone: true,
    imports: [InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AuthenticationService],
})
export class RegisterComponent extends MCForm {
    @Title
    readonly title = "Register";
    protected readonly registerMutation = createRegisterMutation();

    override setupForm() {
        return this.fb.group({
            username: ["", [Validators.required, Validators.minLength(4)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
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
