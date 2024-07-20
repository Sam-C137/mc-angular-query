import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArticlesService } from "@api";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { Article } from "@types";
import { IsAuthenticatedDirective } from "../../../libs/directives/is-authenticated.directive";

@Component({
    selector: "mc-article-list",
    standalone: true,
    imports: [RouterLink, DatePipe, IsAuthenticatedDirective],
    templateUrl: "./article-list.component.html",
    styleUrl: "./article-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
    articles = input.required<Article[]>();
    private articlesService = inject(ArticlesService);

    protected readonly favoriteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articlesService.favorite(slug),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
        },
    }));

    protected readonly unFavoriteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articlesService.unfavorite(slug),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
        },
    }));

    favoriteArticle(slug: Article["slug"], isFavorited: boolean) {
        if (isFavorited) {
            this.unFavoriteMutation.mutate(slug);
        } else {
            this.favoriteMutation.mutate(slug);
        }
    }
}
