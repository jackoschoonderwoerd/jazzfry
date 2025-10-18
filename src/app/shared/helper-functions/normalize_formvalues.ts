export function normalizeFormValues<T extends Record<string, any>>(values: T): T {
    const normalized: any = {};
    Object.keys(values).forEach(key => {
        const value = values[key];
        normalized[key] =
            typeof value === 'string' ? value.trim().toLowerCase() : value;
    });
    return normalized as T;
}
