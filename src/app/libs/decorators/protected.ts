export function Protected(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: unknown[]) {
        // @ts-ignore
        if (!this.isAuthenticated) {
            // @ts-ignore
            await this.router.navigate(["/login"]);
            return null;
        }
        return originalMethod.apply(this, args);
    };

    return descriptor;
}
