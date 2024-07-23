import { injectMutation, injectQueryClient } from "@tanstack/angular-query-experimental";
import { Article } from "@types";
import { inject } from "@angular/core";
import { ArticlesService } from "@api";
import { Router } from "@angular/router";

export function createArticleMutation() {
    const articleService = inject(ArticlesService);
    const queryClient = injectQueryClient();
    const router = inject(Router);

    return {
        create: injectMutation(() => ({
            mutationFn: (article: Article) => articleService.create(article),
            onSuccess: async (article) => {
                await queryClient.invalidateQueries({
                    queryKey: ["home-articles"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["article", article.slug],
                });
                await router.navigate(["/article", article.slug]);
            },
        })),
        update: injectMutation(() => ({
            mutationFn: (article: Article) =>
                articleService.update(article.slug, article),
            onSuccess: async (article) => {
                await queryClient.invalidateQueries({
                    queryKey: ["home-articles"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["article", article.slug],
                });
                await router.navigate(["/article", article.slug]);
            },
        })),
    };
}
