import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    input,
    signal,
} from "@angular/core";

@Component({
    selector: "mc-tab-content",
    standalone: true,
    imports: [],
    templateUrl: "./tab-content.component.html",
    styleUrl: "./tab-content.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent {
    @HostBinding("role")
    private role = "tabpanel";

    public value = input<string>();

    @HostBinding("attr.aria-labelledby")
    get ariaLabelledby() {
        return this.value() ?? "";
    }

    public display = signal("none");

    @HostBinding("style.display")
    public get displayStyle() {
        return this.display();
    }
}
