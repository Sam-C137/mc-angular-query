import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sort",
    standalone: true,
})
export class SortPipe implements PipeTransform {
    transform<T>(
        arr: T[],
        field: T extends object ? keyof T : never,
        order: "asc" | "desc",
    ): T[] {
        if (!arr || arr.length < 1) return arr;

        const isArrayOfObjects = typeof arr[0] === "object";

        if (isArrayOfObjects) {
            return arr.sort((a, b) => {
                const aValue = a[field];
                const bValue = b[field];

                if (typeof aValue === "number" && typeof bValue === "number") {
                    return order === "asc" ? aValue - bValue : bValue - aValue;
                } else if (
                    typeof aValue === "string" &&
                    typeof bValue === "string" &&
                    this.isTimestampField(field)
                ) {
                    const aDate = new Date(aValue);
                    const bDate = new Date(bValue);
                    return order === "asc"
                        ? aDate.getTime() - bDate.getTime()
                        : bDate.getTime() - aDate.getTime();
                } else {
                    return (aValue as string).localeCompare(bValue as string);
                }
            });
        } else {
            return order === "asc" ? arr.sort() : arr.sort().reverse();
        }
    }

    private isTimestampField<T extends object, F = keyof T>(field: F): boolean {
        return typeof field === "string" && field.toLowerCase().endsWith("at");
    }
}
