import { ApplicationConfig, ErrorHandler } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { errorInterceptor, tokenInterceptor } from "@interceptors";
import { CustomErrorHandler } from "@models";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
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
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler,
        },
    ],
};
