import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { AvatarComponent } from "@components";
import { RouterLink } from "@angular/router";
import { AuthenticatedActions } from "@entities";
import { Article } from "@types";
import { Protected } from "@decorators";
import {
    createFavoriteArticleMutation,
    createProfileMutation,
} from "./article-credits.queries";
import { DatePipe } from "@angular/common";

type ArticleQueryResults = ReturnType<typeof createFavoriteArticleMutation>;
type ProfileQueryResults = ReturnType<typeof createProfileMutation>;

@Component({
    selector: "mc-article-credits",
    standalone: true,
    imports: [AvatarComponent, RouterLink, DatePipe],
    templateUrl: "./article-credits.component.html",
    styleUrl: "./article-credits.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCreditsComponent extends AuthenticatedActions {
    public article = input.required<Article>();
    protected favoriteMutation?: ArticleQueryResults["favorite"];
    protected unfavoriteMutation?: ArticleQueryResults["favorite"];
    protected deleteMutation?: ArticleQueryResults["delete"];
    protected followMutation?: ProfileQueryResults["follow"];
    protected unfollowMutation?: ProfileQueryResults["unfollow"];

    constructor() {
        super();
        this.initializeQueries();
    }

    @Protected
    followAuthor(authorname: Article["author"]["username"]) {
        this.followMutation?.mutate(authorname);
    }

    @Protected
    unfollowAuthor(authorname: Article["author"]["username"]) {
        this.unfollowMutation?.mutate(authorname);
    }

    @Protected
    deleteArticle(slug: Article["slug"]) {
        this.deleteMutation?.mutate(slug);
    }

    @Protected
    favoriteArticle(slug: Article["slug"]) {
        this.favoriteMutation?.mutate(slug);
    }

    @Protected
    unfavoriteArticle(slug: Article["slug"]) {
        this.unfavoriteMutation?.mutate(slug);
    }

    private initializeQueries() {
        const {
            favorite,
            unfavorite,
            delete: deleteMut,
        } = createFavoriteArticleMutation();
        this.favoriteMutation = favorite;
        this.unfavoriteMutation = unfavorite;
        this.deleteMutation = deleteMut;
        const { follow, unfollow } = createProfileMutation();
        (this.followMutation = follow), (this.unfollowMutation = unfollow);
    }
}
