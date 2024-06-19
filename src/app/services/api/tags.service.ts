import { Injectable } from "@angular/core";
import { ApiService } from "@entities";
import { AllTags } from "@types";
import { catchError, lastValueFrom } from "rxjs";

@Injectable()
export class TagsService extends ApiService {
    getTags() {
        return lastValueFrom(
            this.http
                .get<AllTags>(`${this.baseUrl}/tags`)
                .pipe(catchError((error) => this.onError(error))),
        );
    }
}
