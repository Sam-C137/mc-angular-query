import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent, InputComponent } from "@components";
import { BaseForm } from "@entities";
import { Title } from "@decorators";
import { AuthenticationService } from "@api";
import { createRegisterMutation } from "./register.component.queries";
import { Email, FormField, SignUpUserDetails } from "@types";

@Component({
    selector: "mc-register",
    standalone: true,
    imports: [InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AuthenticationService],
})
export class RegisterComponent extends BaseForm<{
    username: FormControl<string>;
    email: FormControl<Email>;
    password: FormControl<string>;
}> {
    @Title
    readonly title = "Register";
    protected readonly registerMutation = createRegisterMutation();

    override setupForm() {
        return this.nfb.group<{
            [K in keyof SignUpUserDetails["user"]]: FormField<
                K extends "email" ? Email : string
            >;
        }>({
            username: ["", [Validators.required, Validators.minLength(4)]],
            email: ["" as Email, [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    public submit() {
        if (this.form.valid || !this.registerMutation.isPending()) {
            this.registerMutation.mutate({
                user: this.form.value as Required<typeof this.form.value>,
            });
        }
    }
}
