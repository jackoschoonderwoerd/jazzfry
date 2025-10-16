import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingsStore } from '../../../features/agenda/bookings-store/bookings.store';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MyDateRange } from '../../../features/agenda/bookings-store/bookings.slice';
import { NgClass } from '@angular/common';


@Component({
    selector: 'app-stats-options',
    imports: [MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, NgClass],
    templateUrl: './stats-options.component.html',
    styleUrl: './stats-options.component.scss'
})
export class StatsOptionsComponent {

    bookingsStore = inject(BookingsStore)


    onEndDateChange(startString: string, end: Date) {
        const start = new Date(startString)
        const dateRange: MyDateRange = {
            startDate: new Date(startString),
            endDate: end
        }
        console.log(start, typeof start, end, typeof end)
        this.bookingsStore.setDateRange(dateRange)
    }
}
