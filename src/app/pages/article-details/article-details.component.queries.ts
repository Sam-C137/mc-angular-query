import { injectQuery } from "@tanstack/angular-query-experimental";
import { inject, Signal } from "@angular/core";
import { ArticlesService } from "@api";


export function createArticleQuery(slug: Signal<string>) {
    const articlesService = inject(ArticlesService);

    return injectQuery(() => ({
        queryKey: ["article", slug()],
        queryFn: () => articlesService.getBySlug(slug()),
    }));
}
