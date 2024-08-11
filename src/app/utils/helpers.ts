export function removeFalsyValues<
    T extends {
        [key: string]: any;
    },
>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value) {
            acc[key as keyof T] = value;
        }
        return acc;
    }, {} as Partial<T>);
}

let count = 0;

export function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
