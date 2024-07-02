import { Injectable, effect, signal } from "@angular/core";
import { User } from "@types";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private _user = signal<User | undefined>(undefined);

    constructor() {
        effect(() => {
            if (this._user()) {
                localStorage.setItem("mc-user", JSON.stringify(this._user()));
            }
        });
    }

    get user(): User | undefined {
        if (this._user()) {
            return this._user();
        } else if (localStorage.getItem("mc-user")) {
            this._user.set(JSON.parse(localStorage.getItem("mc-user")!));
            return this._user();
        }
        return undefined;
    }

    set user(user: User | undefined) {
        this._user.set(user);
    }

    logout() {
        this._user.set(undefined);
        localStorage.removeItem("mc-user");
    }
}
