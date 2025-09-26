


export interface UiSlice {
    readonly activeLanguage: string;
    readonly availableLanguages: string[];


    // readonly staffMember: StaffMember;
    // readonly editmode: boolean;
}

export const initialUiSlice: UiSlice = {
    activeLanguage: 'en',
    availableLanguages: ['nl', 'en']




    // staffMember: {
    //     personalia: { firstName: '', particles: '', lastName: '' },
    //     instruments: []
    // },
    // editmode: false
}
