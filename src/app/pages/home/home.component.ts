import { ChangeDetectionStrategy, Component, effect, signal } from "@angular/core";
import { Title } from "@decorators";
import { FeedHeaderComponent } from "./feed-header/feed-header.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ErrorHandlerComponent, PaginationComponent, SpinnerComponent } from "@components";
import { TagListComponent } from "./tag-list/tag-list.component";
import { Tag } from "@types";
import { createArticlesQuery, prefetchArticles } from "./home.component.queries";

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
    readonly title = "Home";
    public isFeed = false;
    protected page = signal(1);
    protected selectedTag = signal<Tag>("");
    protected articleLimit = 10;

    constructor() {
        effect(this.handlePrefetch);
    }

    protected readonly articlesQuery = createArticlesQuery(
        this.page,
        this.articleLimit,
        this.selectedTag(),
        this.isFeed,
    );

    private handlePrefetch = prefetchArticles(
        this.articlesQuery,
        this.page,
        this.articleLimit,
        this.selectedTag(),
        this.isFeed,
    );

    public changePage(page: number) {
        this.page.set(page);
    }
}
