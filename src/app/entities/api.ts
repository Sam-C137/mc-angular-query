import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { TokenService } from "@state";
import { Subject, throwError } from "rxjs";
import { Router } from "@angular/router";

export class ApiService {
    protected destroyer$ = new Subject<void>();
    protected http = inject(HttpClient);
    protected router = inject(Router);
    protected tokenService = inject(TokenService);
    protected baseUrl = environment.BaseUrl;

    /**
     * Returns standard headers
     * @returns {HttpHeaders}
     */
    protected get headers() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };
    }

    /**
     * Handles the HTTP error response.
     * @param error The HTTP error response.
     * @returns An observable of the error.
     */
    protected onError(error: HttpErrorResponse) {
        switch (error.status) {
            case 0:
                console.error(error.error);
                return throwError(() => ({
                    message: "Couldn't connect. Please try again",
                }));
            case 500:
                return throwError(() => ({
                    message:
                        "An error occurred on the server. Please try again later.",
                }));
            case 403:
                this.router.navigate(["/login"]);
                this.tokenService.clear();
                return throwError(() => ({
                    message: "Please login to continue",
                }));
            default:
                console.error(error);
                if (Array.isArray(error.error.message)) {
                    error.error.message = error.error.message.join(", ");
                }
                return throwError(() => error.error.errors);
        }
    }

    destroy() {
        this.destroyer$.next();
        this.destroyer$.complete();
    }
}
