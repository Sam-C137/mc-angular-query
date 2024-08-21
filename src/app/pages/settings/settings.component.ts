import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit, signal,
} from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfileService } from "@api";
import {
    ButtonComponent, DialogComponent,
    InputComponent,
    TextAreaComponent,
} from "@components";
import { BaseForm } from "@entities";
import { TokenService, UserService } from "@state";
import { injectQueryClient } from "@tanstack/angular-query-experimental";
import { createProfileMutation } from "./settings.component.queries";
import { Email, FormField, User } from "@types";

const fields = ["image", "username", "bio", "email", "password"];

@Component({
    selector: "mc-settings",
    standalone: true,
    imports: [
        InputComponent,
        ButtonComponent,
        TextAreaComponent,
        ReactiveFormsModule,
        DialogComponent,
    ],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProfileService],
})
export class SettingsComponent
    extends BaseForm<{
        [K in (typeof fields)[number]]: FormControl<
            K extends "email" ? Email : string
        >;
    }>
    implements OnInit
{
    private userService = inject(UserService);
    private tokenService = inject(TokenService);
    private router = inject(Router);
    private queryClient = injectQueryClient();
    protected readonly profileMutation = createProfileMutation();
    protected isModalOpen = signal(false);

    ngOnInit() {
        this.form = this.setupForm();
    }

    override setupForm() {
        const user = this.userService?.user;

        return this.nfb.group<{
            [K in keyof User & { password: string }]: FormField<
                K extends "email" ? Email : string
            >;
        }>({
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
