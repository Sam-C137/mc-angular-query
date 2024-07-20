import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { TokenService } from "@state";
import { throwError } from "rxjs";
import { Router } from "@angular/router";

export class ApiService {
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
            default:
                console.error(error);
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
}
