import { AuthenticatedActions } from "@entities";

export function Protected(
    target: AuthenticatedActions,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
        if (!(this as AuthenticatedActions).isAuthenticated) {
            await (this as AuthenticatedActions).router.navigate(["/login"]);
            return null;
        }
        return originalMethod.apply(this, args);
    };

    return descriptor;
}
