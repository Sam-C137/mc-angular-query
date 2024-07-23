import { ErrorHandler, inject, Injectable, NgZone } from "@angular/core";


@Injectable()
export class CatchError implements ErrorHandler {
    private zone = inject(NgZone);

    handleError(error: unknown) {
        this.zone.run(() => {
            // some code that only needs to be executed in angular
        });
        console.warn(error);
    }
}
