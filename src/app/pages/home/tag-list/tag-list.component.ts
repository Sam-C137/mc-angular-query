import { ChangeDetectionStrategy, Component, model } from "@angular/core";
import { SpinnerComponent } from "@components";
import { TagsService } from "@api";
import { Tag } from "@types";
import { createTagsQuery } from "./tag-list.component.queries";

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
    selectedTag = model<Tag>();
    tagsQuery = createTagsQuery();
}
