import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from "@angular/core";
import { ProfileBannerComponent } from "./profile-banner/profile-banner.component";
import {
    ErrorHandlerComponent,
    PaginationComponent,
    SpinnerComponent,
    TabComponent,
    TabsListComponent,
    TabTrigger,
} from "@components";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@decorators";
import { ArticleListComponent } from "../home/article-list/article-list.component";
import { createArticlesQuery } from "../home/home.component.queries";

@Component({
    selector: "mc-profile",
    standalone: true,
    imports: [
        ProfileBannerComponent,
        TabComponent,
        TabTrigger,
        ArticleListComponent,
        SpinnerComponent,
        ErrorHandlerComponent,
        PaginationComponent,
        TabsListComponent,
    ],
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    @Title
    protected title = "";
    private route = inject(ActivatedRoute);
    protected username = signal("");
    protected page = signal(1);
    protected articleLimit = signal(10);
    protected favorited = signal("");
    protected author = signal("");

    constructor() {
        this.route.params.subscribe((params) => {
            this.username.set(params["username"]);
            this.author.set(this.username());
            this.title = "@" + this.username();
        });
    }

    protected readonly articlesQuery = createArticlesQuery(this.page, {
        articleLimit: this.articleLimit,
        author: this.author,
        favorited: this.favorited,
        queryKey: "profile-articles",
    });

    public changePage(page: number) {
        this.page.set(page);
    }
}
