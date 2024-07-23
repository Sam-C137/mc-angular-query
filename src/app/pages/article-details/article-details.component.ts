import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ErrorHandlerComponent, SpinnerComponent } from "@components";
import { ArticleBannerComponent } from "./article-banner/article-banner.component";
import { Title } from "@decorators";
import { createArticleQuery } from "./article-details.component.queries";

@Component({
    selector: "mc-article-details",
    standalone: true,
    imports: [SpinnerComponent, ArticleBannerComponent, ErrorHandlerComponent],
    templateUrl: "./article-details.component.html",
    styleUrl: "./article-details.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsComponent {
    @Title
    protected title = "";
    private route = inject(ActivatedRoute);
    private slug = signal<string>("");
    protected readonly articleQuery = createArticleQuery(this.slug);

    constructor() {
        this.route.params.subscribe((params) => {
            const { slug } = params;
            this.slug.set(slug);
            this.title = slug.split("-").join(" ");
        });
    }
}
