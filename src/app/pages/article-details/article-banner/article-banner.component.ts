import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArticlesService, FollowersService } from "@api";
import { AuthenticatedActions } from "@entities";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { Article } from "@types";
import { Protected } from "@decorators";

@Component({
    selector: "mc-article-banner",
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: "./article-banner.component.html",
    styleUrl: "./article-banner.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBannerComponent extends AuthenticatedActions {
    article = input.required<Article>();
    articleService = inject(ArticlesService);
    followersService = inject(FollowersService);

    favoriteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articleService.favorite(slug),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
            await client.invalidateQueries({
                queryKey: ["article", this.article().slug],
            });
        },
    }));

    unfavoriteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articleService.unfavorite(slug),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
            await client.invalidateQueries({
                queryKey: ["article", this.article().slug],
            });
        },
    }));

    deleteMutation = injectMutation((client) => ({
        mutationFn: (slug: string) => this.articleService.delete(slug),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["home-articles"],
            });
            await client.invalidateQueries({
                queryKey: ["article", this.article().slug],
            });
            await this.router.navigate(["/profile", this.user?.username]);
        },
    }));

    followMutation = injectMutation((client) => ({
        mutationFn: (username: string) =>
            this.followersService.follow(username),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["article", this.article().slug],
            });
        },
    }));

    unfollowMutation = injectMutation((client) => ({
        mutationFn: (username: string) =>
            this.followersService.unfollow(username),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ["article", this.article().slug],
            });
        },
    }));

    @Protected
    followAuthor(authorname: Article["author"]["username"]) {
        this.followMutation.mutate(authorname);
    }

    @Protected
    unfollowAuthor(authorname: Article["author"]["username"]) {
        this.unfollowMutation.mutate(authorname);
    }

    @Protected
    deleteArticle(slug: Article["slug"]) {
        this.deleteMutation.mutate(slug);
    }

    @Protected
    favoriteArticle(slug: Article["slug"]) {
        this.favoriteMutation.mutate(slug);
    }
    @Protected
    unfavoriteArticle(slug: Article["slug"]) {
        this.unfavoriteMutation.mutate(slug);
    }
}
