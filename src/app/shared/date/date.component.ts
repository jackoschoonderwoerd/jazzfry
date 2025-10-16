import { Component, inject, input } from '@angular/core';
import { UiStore } from '../ui-store/ui.store';

@Component({
    selector: 'app-date',
    imports: [],
    templateUrl: './date.component.html',
    styleUrl: './date.component.scss'
})
export class DateComponent {
    seconds = input(0);
    uiStore = inject(UiStore)

    getDate() {


        const date: Date = new Date(this.seconds() * 1000)

        if (this.uiStore.activeLanguage() === 'nl') {

            return `${this.getMyDay(date.getDay())} ${date.getDate()} ${this.getMyMonth(date)}`
        } else if (this.uiStore.activeLanguage() === 'en') {
            return `${this.getMyDay(date.getDay())} ${this.getMyMonth(date)} ${date.getDate()}`
        }
    }

    private getMyDay(dayNumber: number) {
        if (this.uiStore.activeLanguage() === 'nl') {
            const days = [
                'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'
            ]
            // console.log(days[dayNumber])
            return days[dayNumber]
        } else if (this.uiStore.activeLanguage() === 'en') {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            return days[dayNumber]
        }
    }
    private getMyMonth(date: Date) {
        const monthNumber: number = date.getMonth()
        if (this.uiStore.activeLanguage() === 'nl') {
            const months = [
                'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'
            ]
            // console.log(months[monthNumber - 1])
            return months[monthNumber]
        } else if (this.uiStore.activeLanguage() === 'en') {
            const months = ['Januari', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[monthNumber]
        }
    }
}
