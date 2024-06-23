import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent, InputComponent } from "@components";
import { MCForm } from "@entities";
import { RegisterService } from "@api";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { Title } from "@decorators";

@Component({
    selector: "mc-register",
    standalone: true,
    imports: [InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RegisterService],
})
export class RegisterComponent extends MCForm {
    @Title
    title = "Register";
    registerService = inject(RegisterService);

    mutation = injectMutation((client) => ({
        mutationFn: (credentials: {
            user: {
                username: string;
                email: string;
                password: string;
            };
        }) => this.registerService.register(credentials),
    }));

    override setupForm() {
        return this.fb.group({
            username: ["", [Validators.required, Validators.minLength(4)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
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
