import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent, NavigationComponent } from "@components";

@Component({
    selector: "mc-root",
    standalone: true,
    imports: [RouterOutlet, NavigationComponent, FooterComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
