import { Routes } from "@angular/router";
import { authenticationGuard } from "@guards";

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
    },
    {
        path: "register",
        loadComponent: () =>
            import("./pages/register/register.component").then(
                (m) => m.RegisterComponent,
            ),
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
];
