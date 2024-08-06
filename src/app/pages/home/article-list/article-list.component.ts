import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Article } from "@types";
import { IsAuthenticatedDirective } from "@directives";
import { createFavoriteArticleMutation } from "./article-list.component.queries";

@Component({
    selector: "mc-article-list",
    standalone: true,
    imports: [RouterLink, DatePipe, IsAuthenticatedDirective],
    templateUrl: "./article-list.component.html",
    styleUrl: "./article-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
    public readonly articles = input.required<Article[]>();
    protected readonly favoriteMutation;
    protected readonly unFavoriteMutation;

    constructor() {
        const { favorite, unfavorite } = createFavoriteArticleMutation();
        this.favoriteMutation = favorite;
        this.unFavoriteMutation = unfavorite;
    }

    favoriteArticle(slug: Article["slug"], isFavorited: boolean) {
        if (isFavorited) {
            this.unFavoriteMutation.mutate(slug);
        } else {
            this.favoriteMutation.mutate(slug);
        }
    }
}
