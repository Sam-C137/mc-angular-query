import { DatePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Article } from "@types";
import { IsAuthenticatedDirective } from "@directives";
import { createFavoriteArticleMutation } from "./article-list.component.queries";
import { AvatarComponent } from "@components";

@Component({
    selector: "mc-article-list",
    standalone: true,
    imports: [RouterLink, DatePipe, IsAuthenticatedDirective, AvatarComponent],
    templateUrl: "./article-list.component.html",
    styleUrl: "./article-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
