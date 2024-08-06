import { Routes } from "@angular/router";
import { authenticationGuard, reverseAuthenticationGuard } from "@guards";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./pages/home/home.component").then((m) => m.HomeComponent),
    },
    {
        path: "login",
        loadComponent: () =>
            import("./pages/login/login.component").then(
                (m) => m.LoginComponent,
            ),
        canActivate: [reverseAuthenticationGuard]
    },
    {
        path: "register",
        loadComponent: () =>
            import("./pages/register/register.component").then(
                (m) => m.RegisterComponent,
            ),
        canActivate: [reverseAuthenticationGuard]
    },
    {
        path: "article/:slug",
        loadComponent: () =>
            import("./pages/article-details/article-details.component").then(
                (m) => m.ArticleDetailsComponent,
            ),
    },
    {
        path: "editor",
        loadComponent: () =>
            import("./pages/editor/editor.component").then(
                (m) => m.EditorComponent,
            ),
        canActivate: [authenticationGuard],
    },
    {
        path: "settings",
        loadComponent: () =>
            import("./pages/settings/settings.component").then(
                (m) => m.SettingsComponent,
            ),
    },
    {
        path: "profile/:username",
        loadComponent: () =>
            import("./pages/profile/profile.component").then(
                (m) => m.ProfileComponent,
            ),
    },
];
