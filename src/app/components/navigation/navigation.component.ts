import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from "@state";

@Component({
    selector: "mc-navigation",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: "./navigation.component.html",
    styleUrl: "./navigation.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    userService = inject(UserService);
    user$ = toObservable(this.userService["_user"]);
}
