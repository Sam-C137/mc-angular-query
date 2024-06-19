import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArticlesService } from "@api";
import { AuthenticatedActions } from "@entities";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { Article } from "@types";
import { Protected } from "src/app/libs/decorators/protected";

@Component({
    selector: "mc-article-list",
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: "./article-list.component.html",
    styleUrl: "./article-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends AuthenticatedActions {
    articles = input.required<Article[]>();
    articlesService = inject(ArticlesService);

    favoriteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articlesService.favorite(slug),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ["home-articles"],
            });
        },
    }));

    unFavoriteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articlesService.unfavorite(slug),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ["home-articles"],
            });
        },
    }));

    @Protected
    favoriteArticle(slug: string, isFavorited: boolean) {
        if (isFavorited) {
            this.unFavoriteMutation.mutate(slug);
        } else {
            this.favoriteMutation.mutate(slug);
        }
    }
}
