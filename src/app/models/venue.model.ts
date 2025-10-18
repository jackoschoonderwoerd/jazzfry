

export interface Venue {
    readonly id?: string;
    readonly name: string;
    readonly street: string;
    readonly number: number;
    readonly city: string;
    readonly country: string;
    readonly phone: number;
    readonly contact: string;
    readonly mapUrl?: string;
    readonly website?: string;
    readonly instagram?: string;
    readonly facebook?: string
}
