import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { TokenService, UserService } from "@state";
import { Router } from "@angular/router";

export class ApiService {
    protected http = inject(HttpClient);
    protected router = inject(Router);
    protected tokenService = inject(TokenService);
    protected baseUrl = environment.BaseUrl;
    protected user = inject(UserService).user;

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
}
