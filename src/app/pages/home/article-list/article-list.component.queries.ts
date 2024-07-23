import { injectMutation } from "@tanstack/angular-query-experimental";
import { inject } from "@angular/core";
import { ArticlesService } from "@api";


export function createFavoriteArticleMutation() {
    const articlesService = inject(ArticlesService);

    return {
        favorite: injectMutation((client) => ({
            mutationFn: (slug: string) => articlesService.favorite(slug),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["home-articles"],
                });
                await client.invalidateQueries({
                    queryKey: ["article"],
                });
            },
        })),
        unfavorite: injectMutation((client) => ({
            mutationFn: (slug: string) => articlesService.unfavorite(slug),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["home-articles"],
                });
                await client.invalidateQueries({
                    queryKey: ["article"],
                });
            },
        })),
        delete: injectMutation((client) => ({
            mutationFn: (slug: string) => articlesService.delete(slug),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["home-articles"],
                });
                await client.invalidateQueries({
                    queryKey: ["article"],
                });
            },
        })),
    };
}
