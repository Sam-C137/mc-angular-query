import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfileService } from "@api";
import { ButtonComponent, InputComponent, TextAreaComponent } from "@components";
import { MCForm } from "@entities";
import { TokenService, UserService } from "@state";
import { injectQueryClient } from "@tanstack/angular-query-experimental";
import { createProfileMutation } from "./settings.component.queries";

@Component({
    selector: "mc-settings",
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        TextAreaComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProfileService],
})
export class SettingsComponent extends MCForm implements OnInit {
    private userService = inject(UserService);
    private tokenService = inject(TokenService);
    private router = inject(Router);
    private queryClient = injectQueryClient();
    protected readonly profileMutation = createProfileMutation();

    ngOnInit() {
        this.form = this.setupForm();
    }

    override setupForm() {
        const user = this.userService?.user;

        return this.fb.group({
            image: [user?.image || ""],
            username: [user?.username || "", [Validators.minLength(4)]],
            bio: [user?.bio || ""],
            email: [user?.email || "", [Validators.email]],
            password: ["", [Validators.minLength(8)]],
        });
    }

    public submit() {
        if (this.form.valid || !this.profileMutation.isPending()) {
            this.profileMutation.mutate({
                user: this.form.value,
            });
        }
    }

    public async logout() {
        this.userService.logout();
        this.tokenService.clear();
        await this.queryClient.invalidateQueries();
        await this.router.navigate([""]);
    }
}
