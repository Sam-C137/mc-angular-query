import { ApplicationConfig, ErrorHandler } from "@angular/core";
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    provideRouter,
    withInMemoryScrolling,
} from "@angular/router";
import {
    provideAngularQuery,
    QueryClient,
} from "@tanstack/angular-query-experimental";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { errorInterceptor, tokenInterceptor } from "@interceptors";
import { CatchError } from "@entities";
import { provideAnimations } from "@angular/platform-browser/animations";

const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: "top",
    anchorScrolling: "enabled",
};
const scrollingFeature: InMemoryScrollingFeature =
    withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes, scrollingFeature),
        provideHttpClient(
            withInterceptors([tokenInterceptor, errorInterceptor]),
        ),
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
            useClass: CatchError,
        },
    ],
};
