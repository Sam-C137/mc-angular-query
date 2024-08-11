import { injectMutation } from "@tanstack/angular-query-experimental";
import { inject } from "@angular/core";
import { ArticlesService } from "@api";

const queryKeysToInvalidate = ["article", "articles", "profile-articles"];

export function createFavoriteArticleMutation() {
    const articlesService = inject(ArticlesService);

    return {
        favorite: injectMutation((client) => ({
            mutationFn: (slug: string) => articlesService.favorite(slug),
            onSuccess: async () => {
                for (const k of queryKeysToInvalidate) {
                    await client.invalidateQueries({
                        queryKey: [k],
                    });
                }
            },
        })),
        unfavorite: injectMutation((client) => ({
            mutationFn: (slug: string) => articlesService.unfavorite(slug),
            onSuccess: async () => {
                for (const k of queryKeysToInvalidate) {
                    await client.invalidateQueries({
                        queryKey: [k],
                    });
                }
            },
        })),
        delete: injectMutation((client) => ({
            mutationFn: (slug: string) => articlesService.delete(slug),
            onSuccess: async () => {
                for (const k of queryKeysToInvalidate) {
                    await client.invalidateQueries({
                        queryKey: [k],
                    });
                }
            },
        })),
    };
}
