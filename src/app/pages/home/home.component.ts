import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    signal,
} from "@angular/core";
import { Title } from "@decorators";
import { FeedHeaderComponent } from "./feed-header/feed-header.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import {
    ErrorHandlerComponent,
    PaginationComponent,
    SpinnerComponent,
} from "@components";
import {
    injectQuery,
    injectQueryClient,
    keepPreviousData,
} from "@tanstack/angular-query-experimental";
import { ArticlesService } from "@api";
import { TagListComponent } from "./tag-list/tag-list.component";
import { Tag } from "@types";
import { removeFalsyValues } from "@utils";

@Component({
    selector: "mc-home",
    standalone: true,
    imports: [
        FeedHeaderComponent,
        ArticleListComponent,
        SpinnerComponent,
        PaginationComponent,
        ErrorHandlerComponent,
        TagListComponent,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    @Title
    title = "Home";

    articlesService = inject(ArticlesService);

    isFeed = false;

    page = signal(1);
    selectedTag = signal<Tag>("");
    articleLimit = 10;

    queryClient = injectQueryClient();

    constructor() {
        effect(() => {
            if (!this.query.isPlaceholderData() && this.query.data()) {
                this.queryClient.prefetchQuery({
                    queryKey: ["home-articles", this.page() + 1],
                    queryFn: () =>
                        this.articlesService.getAll(
                            removeFalsyValues({
                                limit: this.articleLimit,
                                offset: this.page() + 1 * this.articleLimit,
                                tag: this.selectedTag(),
                            }),
                            this.isFeed,
                        ),
                });
            }
        });
    }

    query = injectQuery(() => ({
        queryKey: ["home-articles", this.page()],
        queryFn: () =>
            this.articlesService.getAll(
                removeFalsyValues({
                    limit: this.articleLimit,
                    offset: (this.page() - 1) * this.articleLimit,
                    tag: this.selectedTag(),
                }),
                this.isFeed,
            ),
        placeholderData: keepPreviousData,
    }));

    changePage(page: number) {
        this.page.set(page);
    }
}
