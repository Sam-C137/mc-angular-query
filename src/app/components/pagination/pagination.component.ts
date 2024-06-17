import {
    ChangeDetectionStrategy,
    Component,
    OnChanges,
    SimpleChanges,
    input,
    output,
} from "@angular/core";

@Component({
    selector: "mc-pagination",
    standalone: true,
    imports: [],
    templateUrl: "./pagination.component.html",
    styleUrl: "./pagination.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
    currentPage = input(1);
    total = input(0);
    limit = input(10);
    changePage = output<number>();

    pages: number[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes["total"] || changes["limit"]) {
            const pagesCount = Math.ceil(this.total() / this.limit());
            this.pages = this.range(1, pagesCount);
        }
    }

    range(start: number, end: number) {
        return [...Array(end).keys()].map((i) => i + start);
    }
}
