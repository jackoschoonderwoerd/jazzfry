import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
    selector: 'app-visits',
    imports: [DatePipe],
    templateUrl: './visits.component.html',
    styleUrl: './visits.component.scss'
})
export class VisitsComponent {
    authStore = inject(AuthStore)


}
