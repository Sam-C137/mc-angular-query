import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProfileBannerComponent } from "./profile-banner/profile-banner.component";

@Component({
    selector: "mc-profile",
    standalone: true,
    imports: [ProfileBannerComponent],
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {}
