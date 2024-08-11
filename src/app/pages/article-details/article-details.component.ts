import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ErrorHandlerComponent, SpinnerComponent } from "@components";
import { Title } from "@decorators";
import {
    createArticleQuery,
    createCommentsQuery,
} from "./article-details.component.queries";
import { ArticleCreditsComponent } from "./article-credits/article-credits.component";
import { CommentService } from "@api";
import { CommentBoxComponent } from "./comment-box/comment-box.component";
import { SortPipe } from "@pipes";
import { UserService } from "@state";

@Component({
    selector: "mc-article-details",
    standalone: true,
    imports: [
        SpinnerComponent,
        ErrorHandlerComponent,
        ArticleCreditsComponent,
        CommentBoxComponent,
        SortPipe,
        RouterLink,
    ],
    templateUrl: "./article-details.component.html",
    styleUrl: "./article-details.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentService],
})
export class ArticleDetailsComponent {
    @Title
    protected title = "";
    private route = inject(ActivatedRoute);
    private slug = signal<string>("");
    protected user = inject(UserService).user;
    protected readonly articleQuery = createArticleQuery(this.slug);
    protected readonly commentsQuery = createCommentsQuery(this.slug);

    constructor() {
        this.route.params.subscribe((params) => {
            const { slug } = params;
            this.slug.set(slug);
            this.title = slug.split("-").join(" ");
        });
    }
}
