import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "@state";

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
    const tokenService = inject(TokenService);
    const token = tokenService.get();
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : "",
        },
    });
    return next(request);
};
