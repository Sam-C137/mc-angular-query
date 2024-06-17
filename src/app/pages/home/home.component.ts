import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Title } from "@decorators";
import { FeedHeaderComponent } from "./feed-header/feed-header.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { PaginationComponent, SpinnerComponent } from "@components";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { ArticlesService } from "@api";

@Component({
    selector: "mc-home",
    standalone: true,
    imports: [
        FeedHeaderComponent,
        ArticleListComponent,
        SpinnerComponent,
        PaginationComponent,
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

    currentPage = 1;
    articleLimit = 10;

    query = injectQuery(() => ({
        queryKey: [
            "home-articles",
            {
                limit: this.articleLimit,
                offset: (this.currentPage - 1) * this.articleLimit,
                isFeed: this.isFeed,
            },
        ],
        queryFn: () =>
            this.articlesService.getAll(
                {
                    limit: this.articleLimit,
                    offset: (this.currentPage - 1) * this.articleLimit,
                },
                this.isFeed,
            ),
    }));

    void() {}

    changePage(page: number) {
        this.currentPage = page;
        this.query.refetch();
    }
}
