import {
    injectMutation,
    injectQuery,
    injectQueryClient,
} from "@tanstack/angular-query-experimental";
import { inject, Signal } from "@angular/core";
import { ArticlesService, CommentService } from "@api";

export function createArticleQuery(slug: Signal<string>) {
    const articlesService = inject(ArticlesService);

    return injectQuery(() => ({
        queryKey: ["article", slug()],
        queryFn: () => articlesService.getBySlug(slug()),
    }));
}

export function createCommentsQuery(slug: Signal<string>) {
    const commentService = inject(CommentService);
    const client = injectQueryClient();

    return {
        fetch: injectQuery(() => ({
            queryKey: ["comments", slug()],
            queryFn: () => commentService.getAll(slug()),
        })),
        create: injectMutation(() => ({
            mutationFn: (comment: { body: string }) =>
                commentService.postComment(comment, slug()),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["comments"],
                });
            },
        })),
        delete: injectMutation(() => ({
            mutationFn: (id: number) => commentService.delete(slug(), id),
            onSuccess: async () => {
                await client.invalidateQueries({
                    queryKey: ["comments"],
                });
            },
        })),
    };
}
