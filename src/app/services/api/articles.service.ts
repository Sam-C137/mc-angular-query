import { Injectable } from "@angular/core";
import { ApiService } from "@entities";
import {
    AllArticles,
    Article,
    NewArticle,
    PaginationParams,
    Tag,
    User,
} from "@types";
import { lastValueFrom, map, tap } from "rxjs";

export type ArticleExtras = {
    tag: Tag;
    author: User["username"];
    favorited: User["username"];
};

@Injectable({
    providedIn: "root",
})
export class ArticlesService extends ApiService {
    getAll(
        params: Partial<PaginationParams & ArticleExtras>,
        isFeed: boolean = false,
    ): Promise<AllArticles> {
        return lastValueFrom(
            this.http.get<AllArticles>(
                `${this.baseUrl}/articles${isFeed ? "/feed" : ""}`,
                {
                    headers: this.headers.headers,
                    params,
                },
            ),
        );
    }

    favorite(slug: Article["slug"]): Promise<Article> {
        return lastValueFrom(
            this.http
                .post<{
                    article: Article;
                }>(`${this.baseUrl}/articles/${slug}/favorite`, {})
                .pipe(map((data) => data.article)),
        );
    }

    unfavorite(slug: Article["slug"]): Promise<Article> {
        return lastValueFrom(
            this.http
                .delete<{
                    article: Article;
                }>(`${this.baseUrl}/articles/${slug}/favorite`)
                .pipe(map((data) => data.article)),
        );
    }

    getBySlug(slug: Article["slug"]): Promise<Article> {
        return lastValueFrom(
            this.http
                .get<{ article: Article }>(`${this.baseUrl}/articles/${slug}`)
                .pipe(map((data) => data.article)),
        );
    }

    delete(slug: Article["slug"]): Promise<Article> {
        return lastValueFrom(
            this.http
                .delete<{
                    article: Article;
                }>(`${this.baseUrl}/articles/${slug}`)
                .pipe(
                    tap(async () => {
                        await this.router.navigate([
                            "/profile",
                            this.user?.username,
                        ]);
                    }),
                    map((data) => data.article),
                ),
        );
    }

    create(article: NewArticle): Promise<Article> {
        return lastValueFrom(
            this.http
                .post<{ article: Article }>(`${this.baseUrl}/articles`, {
                    article,
                })
                .pipe(map((data) => data.article)),
        );
    }

    update(
        slug: Article["slug"],
        article: Partial<NewArticle>,
    ): Promise<Article> {
        return lastValueFrom(
            this.http
                .put<{ article: Article }>(`${this.baseUrl}/articles/${slug}`, {
                    article,
                })
                .pipe(map((data) => data.article)),
        );
    }
}
