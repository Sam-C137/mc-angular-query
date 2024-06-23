import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    inject,
} from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ArticlesService } from "@api";
import {
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
} from "@components";
import { MCForm } from "@entities";
import {
    injectMutation,
    injectQueryClient,
} from "@tanstack/angular-query-experimental";
import { Article } from "@types";

@Component({
    selector: "mc-editor",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputComponent,
        ButtonComponent,
        TextAreaComponent,
    ],
    templateUrl: "./editor.component.html",
    styleUrl: "./editor.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent extends MCForm implements OnDestroy {
    private articleService = inject(ArticlesService);
    private router = inject(Router);

    queryClient = injectQueryClient();

    creationMutation = injectMutation(() => ({
        mutationFn: (article: Article) => this.articleService.create(article),
        onSuccess: async (article) => {
            await this.queryClient.invalidateQueries({
                queryKey: ["home-articles"],
            });
            await this.queryClient.invalidateQueries({
                queryKey: ["article", article.slug],
            });
            await this.router.navigate(["/article", article.slug]);
        },
    }));

    updateMutation = injectMutation(() => ({
        mutationFn: (article: Article) =>
            this.articleService.update(article.slug, article),
        onSuccess: async (article) => {
            await this.queryClient.invalidateQueries({
                queryKey: ["home-articles"],
            });
            await this.queryClient.invalidateQueries({
                queryKey: ["article", article.slug],
            });
            await this.router.navigate(["/article", article.slug]);
        },
    }));

    override setupForm() {
        const { article } = history.state as { article?: Article };
        return this.fb.group({
            title: [article?.title || "", [Validators.required]],
            description: [article?.description || "", [Validators.required]],
            body: [article?.body || "", Validators.required],
            tagList: [article?.tagList.join(", ") || "", Validators.required],
        });
    }

    submit() {
        if (!this.form.valid) return;

        const tags = this.form
            .get("tagList")
            ?.value.split(/\s+|,|;/)
            .filter(Boolean);
        const { article } = history.state as { article?: Article };

        if (article) {
            this.updateMutation.mutate({
                ...this.form.value,
                ...article,
                tagList: tags,
            });
        } else {
            this.creationMutation.mutate({
                ...this.form.value,
                tagList: tags,
            });
        }
    }

    ngOnDestroy() {
        history.state.article = {};
    }
}
