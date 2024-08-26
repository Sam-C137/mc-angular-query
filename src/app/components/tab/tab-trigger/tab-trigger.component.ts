import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    input,
    model,
    output,
} from "@angular/core";
import { genId } from "@utils";
import { tap, timer } from "rxjs";

@Component({
    selector: "mc-tab-trigger",
    standalone: true,
    imports: [],
    templateUrl: "./tab-trigger.component.html",
    styleUrl: "./tab-trigger.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabTrigger implements AfterContentInit {
    ngAfterContentInit() {
        if (this.defaultValue()) {
            timer(1)
                .pipe(tap(() => this.handleActiveChange()))
                .subscribe();
        }
    }

    @HostBinding("attr.data-id")
    readonly id = genId();

    @HostBinding("role")
    private role = "tab";

    @HostBinding("tabindex")
    private tabindex = 0;

    @HostBinding("attr.aria-selected")
    get activeState() {
        return Boolean(this.active());
    }

    @HostBinding("attr.aria-controls")
    get ariaControls() {
        return this.value();
    }

    public active = model<boolean>();
    public activeChange = output<[string, string]>();
    public value = input<string>("");
    public defaultValue = input<boolean>();

    @HostListener("click", ["$event"])
    private handleActiveChange() {
        this.activeChange.emit([this.id, this.value()]);
    }

    @HostListener("keydown", ["$event"])
    private handleKeydown(e: KeyboardEvent) {
        e.key === "Enter" && this.handleActiveChange();
    }
}
