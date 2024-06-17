import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import {
    provideAngularQuery,
    QueryClient,
} from "@tanstack/angular-query-experimental";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { tokenInterceptor } from "@interceptors";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideAngularQuery(
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        staleTime: 1000 * 60 * 30,
                    },
                },
            }),
        ),
    ],
};
