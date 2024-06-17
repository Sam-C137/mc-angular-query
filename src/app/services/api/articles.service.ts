import { Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { AllArticles, PaginationParams } from "@types";
import { catchError, lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ArticlesService extends ApiService {
    getAll(
        params: PaginationParams,
        isFeed: boolean = false,
    ): Promise<AllArticles> {
        return lastValueFrom(
            this.http
                .get<AllArticles>(
                    `${this.baseUrl}/articles${isFeed ? "/feed" : ""}`,
                    {
                        headers: this.headers.headers,
                        params,
                    },
                )
                .pipe(catchError((error) => this.onError(error))),
        );
    }
}
