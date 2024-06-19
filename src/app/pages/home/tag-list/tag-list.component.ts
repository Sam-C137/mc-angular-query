import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SpinnerComponent } from "@components";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { TagsService } from "src/app/services/api/tags.service";

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

    query = injectQuery(() => ({
        queryKey: ["tags"],
        queryFn: () => this.tagsService.getTags(),
    }));
}
