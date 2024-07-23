import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import {
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
} from "@components";
import { MCForm } from "@entities";
import { Article } from "@types";
import { createArticleMutation } from "./editor.component.queries";

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
        return this.fb.group({
            title: [article?.title || "", [Validators.required]],
            description: [article?.description || "", [Validators.required]],
            body: [article?.body || "", Validators.required],
            tagList: [article?.tagList.join(", ") || ""],
        });
    }

    public submit() {
        if (!this.form.valid) return;

        const tags = this.form
            .get("tagList")
            ?.value.split(/\s+|,|;/)
            .filter(Boolean);
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
            });
        }
    }

    ngOnDestroy() {
        history.state.article = {};
    }
}
