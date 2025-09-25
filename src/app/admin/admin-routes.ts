import { Routes } from '@angular/router';


export const adminRoutes: Routes = [

    {
        path: 'staff',
        loadComponent: () => import('./staff/staff.component')
            .then(c => c.StaffComponent),
        // providers: [AddStaffStore]

    }, {

        path: 'book',
        loadComponent: () => import('./book/book.component')
            .then(c => c.BookComponent)
    },
    {
        path: 'venues',
        loadComponent: () => import('./venues/venues.component')
            .then(c => c.VenuesComponent)
    },
    {
        path: 'visits',
        loadComponent: () => import('./visits/visits.component')
            .then(c => c.VisitsComponent)
    }

];
