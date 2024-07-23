import { injectQuery, injectQueryClient, keepPreviousData } from "@tanstack/angular-query-experimental";
import { removeFalsyValues } from "@utils";
import { inject, Signal } from "@angular/core";
import { ArticlesService } from "@api";
import { Tag } from "@types";

export function createArticlesQuery(
    page: Signal<number>,
    articleLimit: number,
    tag: Tag,
    isFeed?: boolean,
) {
    const articlesService = inject(ArticlesService);

    return injectQuery(() => ({
        queryKey: ["home-articles", page()],
        queryFn: () =>
            articlesService.getAll(
                removeFalsyValues({
                    limit: articleLimit,
                    offset: (page() - 1) * articleLimit,
                    tag,
                }),
                isFeed,
            ),
        placeholderData: keepPreviousData,
    }));
}

export function prefetchArticles(
    articlesQuery: ReturnType<typeof createArticlesQuery>,
    page: Signal<number>,
    articleLimit: number,
    tag: Tag,
    isFeed?: boolean,
) {
    const queryClient = injectQueryClient();
    const articlesService = inject(ArticlesService);

    return async () => {
        if (!articlesQuery.isPlaceholderData() && articlesQuery.data()) {
            await queryClient.prefetchQuery({
                queryKey: ["home-articles", page() + 1],
                queryFn: () =>
                    articlesService.getAll(
                        removeFalsyValues({
                            limit: articleLimit,
                            offset: page() + 1 * articleLimit,
                            tag,
                        }),
                        isFeed,
                    ),
            });
        }
    };
}
