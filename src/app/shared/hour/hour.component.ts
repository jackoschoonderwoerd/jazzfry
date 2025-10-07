import { Component, inject, input } from '@angular/core';
import { UiStore } from '../ui-store/ui.store';

@Component({
    selector: 'app-hour',
    imports: [],
    templateUrl: './hour.component.html',
    styleUrl: './hour.component.scss'
})
export class HourComponent {
    hour = input<string>()
    uiStore = inject(UiStore)

    constructor() {
        console.log(this.hour())
    }
    getHour(hour: string) {
        if (hour) {
            // console.log(hour)
            if (this.uiStore.activeLanguage() === 'nl') {
                return hour
            } else if (this.uiStore.activeLanguage() === 'en') {
                const hourArray = hour.split(':')
                // console.log((hourArray))
                const hourNumber = parseInt(hourArray[0])
                // console.log(hourNumber)
                if (hourNumber > 12) {
                    return hourNumber - 12 + ':' + hourArray[1] + ' ' + 'PM'
                } else {
                    return hourNumber + ' ' + hourArray[1] + ' ' + 'AM'
                }
            } else {
                return hour
            }
        }
    }
}
