import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sort",
    standalone: true,
})
export class SortPipe implements PipeTransform {
    transform<T>(arr: T[], field: string, order: "asc" | "desc"): T[] {
        if (!arr || arr.length < 1) return arr;

        const isArrayOfObjects = typeof arr[0] === "object";

        if (isArrayOfObjects) {
            return arr.sort((a, b) => {
                const aValue = this.extractValue(a, field);
                const bValue = this.extractValue(b, field);

                if (typeof aValue === "number" && typeof bValue === "number") {
                    return order === "asc" ? aValue - bValue : bValue - aValue;
                } else if (this.isTimestampField(field)) {
                    const aDate = new Date(aValue);
                    const bDate = new Date(bValue);
                    return order === "asc"
                        ? aDate.getTime() - bDate.getTime()
                        : bDate.getTime() - aDate.getTime();
                } else {
                    return aValue.localeCompare(bValue);
                }
            });
        } else {
            return order === "asc" ? arr.sort() : arr.sort().reverse();
        }
    }

    private extractValue(obj: any, field: string): any {
        return obj[field];
    }

    private isTimestampField(field: string): boolean {
        return field.toLowerCase().endsWith("at");
    }
}
