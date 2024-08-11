import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    OnInit,
    signal,
} from "@angular/core";
import {
    AvatarComponent,
    ButtonComponent,
    TextAreaComponent,
} from "@components";
import { BaseForm } from "@entities";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Comment, FormField } from "@types";
import { createCommentsQuery } from "./comment-box.queries";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommentService } from "@api";
import { UserService } from "@state";
import { DatePipe } from "@angular/common";

type CommentQueryResults = ReturnType<typeof createCommentsQuery>;

@Component({
    selector: "mc-comment-box",
    standalone: true,
    imports: [
        TextAreaComponent,
        ReactiveFormsModule,
        ButtonComponent,
        AvatarComponent,
        RouterLink,
        DatePipe,
    ],
    templateUrl: "./comment-box.component.html",
    styleUrl: "./comment-box.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentService],
})
export class CommentBoxComponent
    extends BaseForm<{
        body: FormControl<string>;
    }>
    implements OnInit
{
    public comment = input<Comment>();
    public editMode = input<boolean>(false);
    private route = inject(ActivatedRoute);
    private slug = signal("");
    protected user = inject(UserService).user;
    protected readonly createCommentMutation: CommentQueryResults["create"];
    protected readonly deleteCommentMutation: CommentQueryResults["delete"];

    constructor() {
        super();
        this.slug.set(this.route.snapshot.params["slug"]);
        const { create, delete: deleteComment } = createCommentsQuery(
            this.slug,
        );
        this.createCommentMutation = create;
        this.deleteCommentMutation = deleteComment;
    }

    ngOnInit() {
        this.form = this.setupForm();
        if (!this.editMode()) this.form.disable();
    }

    override setupForm() {
        return this.nfb.group<{
            body: FormField<string>;
        }>({
            body: [
                (this.comment && this.comment()?.body) || "",
                [Validators.required],
            ],
        });
    }

    public submit() {
        if (this.form.invalid) return;
        this.createCommentMutation.mutate(
            this.form.value as Required<typeof this.form.value>,
        );
        this.form.reset();
    }

    public handleDelete(commentId?: number) {
        if (!commentId) return;
        this.deleteCommentMutation.mutate(commentId);
    }
}
