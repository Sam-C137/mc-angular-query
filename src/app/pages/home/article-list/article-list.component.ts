import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Article } from "@types";

@Component({
    selector: "mc-article-list",
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: "./article-list.component.html",
    styleUrl: "./article-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
    articles = input.required<Article[]>();

    favoriteArticle(...args: unknown[]) {}
}
