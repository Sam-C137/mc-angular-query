import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticlesService } from "@api";
import { ErrorHandlerComponent, SpinnerComponent } from "@components";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { ArticleBannerComponent } from "./article-banner/article-banner.component";
import { Title } from "@decorators";

@Component({
    selector: "mc-article-details",
    standalone: true,
    imports: [SpinnerComponent, ArticleBannerComponent, ErrorHandlerComponent],
    templateUrl: "./article-details.component.html",
    styleUrl: "./article-details.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsComponent {
    route = inject(ActivatedRoute);
    slug = signal<string>("");
    articlesService = inject(ArticlesService);

    @Title
    title = "";

    constructor() {
        this.route.params.subscribe((params) => {
            const { slug } = params;
            this.slug.set(slug);
            this.title = slug.split("-").join(" ");
        });
    }

    query = injectQuery((client) => ({
        queryKey: ["article", this.slug()],
        queryFn: () => this.articlesService.getBySlug(this.slug()),
    }));
}
