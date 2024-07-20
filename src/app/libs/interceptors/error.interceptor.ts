import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError(err => onError(err)),
    );
};


function onError(error: HttpErrorResponse) {
    switch (error.status) {
        case 0:
            return throwError(() => ({
                message: "Couldn't connect. Please try again",
            }));
        case 500:
            return throwError(() => ({
                message:
                    "An error occurred on the server. Please try again later.",
            }));
        default:
            let errorMessage = "An error occurred";
            if (error && error.error && error.error.errors) {
                const errors: { [key: string]: string[] } =
                    error.error.errors;
                const errorMessages = [];
                for (const [key, value] of Object.entries(errors)) {
                    errorMessages.push(`${key}: ${value.join(", ")}`);
                }
                errorMessage = errorMessages.join(", ");
            }
            return throwError(() => new Error(errorMessage));
    }
}
