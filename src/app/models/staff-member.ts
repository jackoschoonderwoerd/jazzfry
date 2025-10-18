export interface Personalia {
    readonly firstName: string;
    readonly particles?: string;
    readonly lastName: string;
}

export interface StaffMember {
    readonly id?: string;
    readonly personalia: Personalia;
    readonly instruments: string[];
    readonly biography?: string;
    readonly imgPath?: string
}


