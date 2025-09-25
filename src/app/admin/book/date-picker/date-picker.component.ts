import { Component, inject, effect } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BookStore } from '../book-store/book.store';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
    selector: 'app-date-picker',
    imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatInput,
        MatNativeDateModule,
        FormsModule,

    ],
    templateUrl: './date-picker.component.html',
    styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
    bookStore = inject(BookStore);
    constructor() {
        this.bookStore.editmode()
    }

    getDate() {
        console.log(this.bookStore.date());
        const y: any = this.bookStore.date();
        console.log(y)
        const d = new Date(y.seconds * 1000)
        console.log(d)
        return d
    }

}
