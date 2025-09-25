export interface Personalia {
    firstName: string;
    particles?: string;
    lastName: string;
}

export interface StaffMember {
    id?: string;
    personalia: Personalia;
    instruments: string[];
    biography?: string;
    imgPath?: string
}


