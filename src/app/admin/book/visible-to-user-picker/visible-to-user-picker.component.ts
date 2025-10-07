import { Component, inject } from '@angular/core';
import { BookStore } from '../book-store/book.store';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-visible-to-user-picker',
    imports: [MatCheckboxModule],
    templateUrl: './visible-to-user-picker.component.html',
    styleUrl: './visible-to-user-picker.component.scss'
})
export class VisibleToUserPickerComponent {
    bookStore = inject(BookStore)
}
