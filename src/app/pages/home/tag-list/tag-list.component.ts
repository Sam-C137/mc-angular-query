import {
    ChangeDetectionStrategy,
    Component,
    inject,
    model,
} from "@angular/core";
import { SpinnerComponent } from "@components";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { TagsService } from "@api";
import { Tag } from "@types";

@Component({
    selector: "mc-tag-list",
    standalone: true,
    imports: [SpinnerComponent],
    templateUrl: "./tag-list.component.html",
    styleUrl: "./tag-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TagsService],
})
export class TagListComponent {
    tagsService = inject(TagsService);
    selectedTag = model<Tag>();

    query = injectQuery(() => ({
        queryKey: ["tags"],
        queryFn: () => this.tagsService.getTags(),
    }));
}
