import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    contentChildren,
} from "@angular/core";
import { TabContentComponent } from "./tab-content/tab-content.component";
import { TabsListComponent } from "./tabs-list/tabs-list.component";

@Component({
    selector: "mc-tab",
    standalone: true,
    imports: [],
    templateUrl: "./tab.component.html",
    styleUrl: "./tab.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements AfterContentInit {
    private tabList = contentChild(TabsListComponent);
    private tabContents = contentChildren(TabContentComponent);

    ngAfterContentInit() {
        this.handleActivate();
    }

    private handleActivate() {
        this.tabList()?.activeChange.subscribe(([, value]) => {
            this.tabContents().forEach((tContent) => {
                tContent.display.set(
                    tContent.value() === value ? "block" : "none",
                );
            });
        });
    }
}
