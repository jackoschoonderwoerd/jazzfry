import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingsStore } from '../../../features/agenda/bookings-store/bookings.store';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-stats-options',
    imports: [MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
    templateUrl: './stats-options.component.html',
    styleUrl: './stats-options.component.scss'
})
export class StatsOptionsComponent {

    bookingsStore = inject(BookingsStore)


    onEndDateChange(startString: string, end: Date) {
        const start = new Date(startString)
        console.log(start, typeof start, end, typeof end)
    }
}
