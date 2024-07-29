import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import {
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
} from "@components";
import { BaseForm } from "@entities";
import { Article, FormField } from "@types";
import { createArticleMutation } from "./editor.component.queries";

const fields = ["image", "username", "bio", "email", "password"];

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
export class EditorComponent
    extends BaseForm<{
        [K in (typeof fields)[number]]: FormControl<string>;
    }>
    implements OnDestroy
{
    protected readonly creationMutation;
    protected readonly updateMutation;

    constructor() {
        super();
        const { create, update } = createArticleMutation();
        this.creationMutation = create;
        this.updateMutation = update;
    }

    override setupForm() {
        const { article } = history.state as { article?: Article };
        return this.nfb.group<{
            [K in (typeof fields)[number]]: FormField<string>;
        }>({
            title: [article?.title || "", [Validators.required]],
            description: [article?.description || "", [Validators.required]],
            body: [article?.body || "", [Validators.required]],
            tagList: [article?.tagList.join(", ") || "", []],
        });
    }

    public submit() {
        if (!this.form.valid) return;

        const tags =
            this.form
                .get("tagList")
                ?.value.split(/\s+|,|;/)
                .filter(Boolean) || [];

        const { article } = history.state as { article?: Article };

        if (article) {
            this.updateMutation.mutate({
                ...article,
                ...this.form.value,
                tagList: tags,
            });
        } else {
            this.creationMutation.mutate({
                ...this.form.value,
                tagList: tags,
            } as Article);
        }
    }

    ngOnDestroy() {
        history.state.article = {};
    }
}
