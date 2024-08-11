import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    contentChildren,
    input,
    signal,
} from "@angular/core";
import { TabItemComponent } from "./tab-item/tab-item.component";

@Component({
    selector: "mc-tab",
    standalone: true,
    imports: [],
    templateUrl: "./tab.component.html",
    styleUrl: "./tab.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements AfterContentInit {
    private tabItems = contentChildren(TabItemComponent);
    public defaultActivate = input<boolean>();
    private activeItem = signal("");

    ngAfterContentInit() {
        if (this.defaultActivate()) {
            this.handleActivate();
        }
    }

    private handleActivate() {
        this.tabItems().forEach((tItem) => {
            tItem.activeChange.subscribe((id) => {
                this.setActiveItem(id);
            });
        });
    }

    private setActiveItem(id: string) {
        if (this.activeItem() === id) {
            this.activeItem.set("");
        } else {
            this.activeItem.set(id);
        }

        this.tabItems().forEach((tItem) => {
            tItem.active.set(tItem.id === this.activeItem());
        });
    }
}
