import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent, InputComponent } from "@components";
import { Title } from "@decorators";
import { BaseForm } from "@entities";
import { AuthenticationService } from "@api";
import { createLoginMutation } from "./login.component.queries";
import { Email, FormField, LoginUserDetails } from "@types";

@Component({
    selector: "mc-login",
    standalone: true,
    imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AuthenticationService],
})
export class LoginComponent extends BaseForm<{
    email: FormControl<Email>;
    password: FormControl<string>;
}> {
    @Title
    readonly title = "Login";
    protected readonly loginMutation = createLoginMutation();

    override setupForm() {
        return this.nfb.group<{
            [K in keyof LoginUserDetails["user"]]: FormField<
                K extends "email" ? Email : string
            >;
        }>({
            email: ["" as Email, [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    public submit() {
        if (this.form.valid || !this.loginMutation.isPending()) {
            this.loginMutation.mutate({
                user: this.form.value as Required<typeof this.form.value>,
            });
        }
    }
}
