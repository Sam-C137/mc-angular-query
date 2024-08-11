import { Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { Article, Comment } from "@types";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class CommentService extends ApiService {
    getAll(slug: Article["slug"]): Promise<Comment[]> {
        return lastValueFrom(
            this.http
                .get<{
                    comments: Comment[];
                }>(`${this.baseUrl}/articles/${slug}/comments`, this.headers)
                .pipe(map((data) => data.comments)),
        );
    }

    postComment(
        comment: { body: string },
        slug: Article["slug"],
    ): Promise<Comment> {
        return lastValueFrom(
            this.http
                .post<{
                    comment: Comment;
                }>(
                    `${this.baseUrl}/articles/${slug}/comments`,
                    { comment },
                    this.headers,
                )
                .pipe(map((data) => data.comment)),
        );
    }

    delete(slug: Article["slug"], id: Comment["id"]): Promise<void> {
        return lastValueFrom(
            this.http.delete<void>(
                `${this.baseUrl}/articles/${slug}/comments/${id}`,
                this.headers,
            ),
        );
    }
}
