import {
    injectQuery,
    injectQueryClient,
    keepPreviousData,
} from "@tanstack/angular-query-experimental";
import { removeFalsyValues } from "@utils";
import { inject, Signal } from "@angular/core";
import { ArticleExtras, ArticlesService } from "@api";

type Params = Partial<
    Record<keyof ArticleExtras, Signal<ArticleExtras[keyof ArticleExtras]>>
> & {
    articleLimit: Signal<number>;
    queryKey?: string;
};

export function createArticlesQuery(
    page: Signal<number>,
    params: Params,
    isFeed?: Signal<boolean>,
) {
    const articlesService = inject(ArticlesService);

    return injectQuery(() => ({
        queryKey: [
            params.queryKey || "articles",
            page(),
            params.author?.(),
            params.favorited?.(),
        ],
        queryFn: () =>
            articlesService.getAll(
                removeFalsyValues({
                    limit: params.articleLimit(),
                    offset: (page() - 1) * params.articleLimit(),
                    tag: params.tag?.(),
                    author: params.author?.(),
                    favorited: params.favorited?.(),
                }),
                isFeed && isFeed(),
            ),
        placeholderData: keepPreviousData,
    }));
}

export function prefetchArticles(
    articlesQuery: ReturnType<typeof createArticlesQuery>,
    page: Signal<number>,
    params: Params,
    isFeed?: Signal<boolean>,
) {
    const queryClient = injectQueryClient();
    const articlesService = inject(ArticlesService);

    return async () => {
        if (!articlesQuery.isPlaceholderData() && articlesQuery.data()) {
            await queryClient.prefetchQuery({
                queryKey: [
                    params.queryKey || "articles",
                    page() + 1,
                    params.author?.(),
                    params.favorited?.(),
                ],
                queryFn: () =>
                    articlesService.getAll(
                        removeFalsyValues({
                            limit: params.articleLimit(),
                            offset: (page() - 1) * params.articleLimit(),
                            tag: params.tag?.(),
                            author: params.author?.(),
                            favorited: params.favorited?.(),
                        }),
                        isFeed && isFeed(),
                    ),
            });
        }
    };
}
