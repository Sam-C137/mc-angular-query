import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from "@state";

@Component({
    selector: "mc-navigation",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./navigation.component.html",
    styleUrl: "./navigation.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    user = inject(UserService).user;
}
