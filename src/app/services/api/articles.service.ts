import { Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { AllArticles, Article, PaginationParams } from "@types";
import { catchError, lastValueFrom, map } from "rxjs";

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

    favorite(slug: string): Promise<Article> {
        return lastValueFrom(
            this.http
                .post<{ article: Article }>(
                    `${this.baseUrl}/articles/${slug}/favorite`,
                    {},
                )
                .pipe(
                    map((data) => data.article),
                    catchError((error) => this.onError(error)),
                ),
        );
    }

    unfavorite(slug: string): Promise<Article> {
        return lastValueFrom(
            this.http
                .delete<{ article: Article }>(
                    `${this.baseUrl}/articles/${slug}/favorite`,
                )
                .pipe(
                    map((data) => data.article),
                    catchError((error) => this.onError(error)),
                ),
        );
    }
}
