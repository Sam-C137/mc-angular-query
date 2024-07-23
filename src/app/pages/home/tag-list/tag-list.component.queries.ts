import { injectQuery } from "@tanstack/angular-query-experimental";
import { inject } from "@angular/core";
import { TagsService } from "@api";


export function createTagsQuery() {
    const tagsService = inject(TagsService);

    return injectQuery(() => ({
        queryKey: ["tags"],
        queryFn: () => tagsService.getTags(),
    }));
}
