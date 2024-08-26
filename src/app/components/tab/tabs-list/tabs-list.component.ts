import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    contentChildren,
    HostBinding,
    output,
    signal,
} from "@angular/core";
import { TabTrigger } from "@components";

@Component({
    selector: "mc-tabs-list",
    standalone: true,
    imports: [],
    templateUrl: "./tabs-list.component.html",
    styleUrl: "./tabs-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsListComponent implements AfterContentInit {
    private tabItems = contentChildren(TabTrigger);
    private activeItem = signal<[string, string]>(["", ""]);
    public activeChange = output<[string, string]>();

    @HostBinding("role")
    private role = "tablist";

    @HostBinding("tabindex")
    private tabindex = 0;

    ngAfterContentInit() {
        this.handleActivate();
    }

    private handleActivate() {
        this.tabItems().forEach((tItem) => {
            tItem.activeChange.subscribe((id_value) => {
                this.setActiveItem(id_value);
                this.activeChange.emit(id_value);
            });
        });
    }

    private setActiveItem(id_value: [string, string]) {
        if (this.activeItem().at(0) === id_value.at(0)) {
            this.activeItem.set(["", ""]);
        } else {
            this.activeItem.set(id_value);
        }

        this.tabItems().forEach((tItem) => {
            tItem.active.set(tItem.id === this.activeItem().at(0));
        });
    }
}
