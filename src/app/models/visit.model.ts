export interface VisitFormFirebase {
    id?: string;
    visit: {
        seconds: number;
        nanoseconds: number;
    }
}

export interface VisitLocal {
    date: Date;
}
