import {
    injectMutation,
    injectQuery,
    injectQueryClient,
    QueryFilters,
} from "@tanstack/angular-query-experimental";
import { inject, Signal } from "@angular/core";
import { ArticlesService, CommentService } from "@api";
import { Comment } from "@types";

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
    const queryFilters: QueryFilters = {
        queryKey: ["comments"],
    };

    return {
        fetch: injectQuery(() => ({
            queryKey: [...(queryFilters.queryKey || []), slug()],
            queryFn: () => commentService.getAll(slug()),
        })),
        create: injectMutation(() => ({
            mutationFn: (comment: { body: string }) =>
                commentService.postComment(comment, slug()),
            onSuccess: async (comment) => {
                await client.cancelQueries(queryFilters);
                client.setQueriesData<Comment[]>(queryFilters, (oldData) => {
                    return [comment, ...(oldData || [])];
                });
                await client.invalidateQueries({
                    queryKey: queryFilters.queryKey,
                    predicate(query) {
                        return !query.state.data;
                    },
                });
            },
        })),
        delete: injectMutation(() => ({
            mutationFn: (id: number) => commentService.delete(slug(), id),
            onSuccess: async (data, id) => {
                await client.cancelQueries(queryFilters);
                client.setQueriesData<Comment[]>(queryFilters, (oldData) => {
                    return oldData?.filter((comment) => comment.id !== id);
                });
            },
        })),
    };
}
