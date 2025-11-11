import { MenuItem } from "../../models/menu-item.model";



export interface UiSlice {
    readonly activeLanguage: string;
    readonly availableLanguages: string[];
    readonly menuItems: MenuItem[];
    readonly adminMenuItems: MenuItem[];
    readonly sidenavStatus: boolean
    readonly showNavigation: boolean


    // readonly staffMember: StaffMember;
    // readonly editmode: boolean;
}

export const initialUiSlice: UiSlice = {
    activeLanguage: 'en',
    availableLanguages: ['nl', 'en'],
    showNavigation: true,
    menuItems: [
        {
            link: 'home',
            appearanceNl: 'home',
            appearanceEn: 'home'
        },
        {
            link: 'agenda',
            appearanceNl: 'programma',
            appearanceEn: 'program'
        },
        {
            link: 'contact',
            appearanceEn: 'contact',
            appearanceNl: 'contact'
        },
        // {
        //     link: 'photo-viewer',
        //     appearanceEn: 'photos',
        //     appearanceNl: 'foto\'s'
        // }

    ],
    adminMenuItems: [
        {
            link: 'admin/staff',
            appearanceEn: 'staff',
            appearanceNl: 'staff'
        },
        {
            link: 'admin/venues',
            appearanceEn: 'venues',
            appearanceNl: 'venues'
        },
        {
            link: 'admin/book',
            appearanceEn: 'book',
            appearanceNl: 'book'
        },
        {
            link: 'admin/visits',
            appearanceEn: 'visits',
            appearanceNl: 'visits'
        },
        {
            link: 'admin/stats',
            appearanceEn: 'stats',
            appearanceNl: 'stats'
        },
        {
            link: 'admin/admin-gallery',
            appearanceEn: 'gallery',
            appearanceNl: 'gallery'
        }

    ],
    sidenavStatus: false

}
