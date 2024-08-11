import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    model,
    output,
} from "@angular/core";
import { genId } from "@utils";

@Component({
    selector: "mc-tab-item",
    standalone: true,
    imports: [],
    templateUrl: "./tab-item.component.html",
    styleUrl: "./tab-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent {
    @HostBinding("attr.data-id")
    readonly id = genId();

    @HostBinding("class.active")
    get activeState() {
        return Boolean(this.active());
    }

    public active = model<boolean>();
    public activeChange = output<string>();

    @HostListener("click", ["$event"])
    private handleActiveChange() {
        this.activeChange.emit(this.id);
    }
}
