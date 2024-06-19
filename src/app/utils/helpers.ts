export function removeFalsyValues<
    T extends {
        [key: string]: any;
    },
>(obj: T) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value) {
            acc[key as keyof T] = value;
        }
        return acc;
    }, {} as Partial<T>);
}
