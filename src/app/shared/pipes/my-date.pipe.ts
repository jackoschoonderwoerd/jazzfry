import { inject, Pipe, PipeTransform } from '@angular/core';
import { UiStore } from '../ui-store/ui.store';

@Pipe({
    name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

    private uiStore = inject(UiStore)


    transform(value: number, ...args: unknown[]): unknown {
        console.log(this.uiStore.activeLanguage())
        const date = new Date(value);
        console.log(date)

        console.log(value)

        if (this.uiStore.activeLanguage() === 'nl') {
            return getDayNl(date)
        } else if (this.uiStore.activeLanguage() === 'en') {
            return getDayEn(date)
        }
        // const selectedLanguage = this.uiStore.getActiveLanguage()
        // console.log(typeof date)

        // return getDay(date);

    }

}


function getDayEn(date: Date) {

    if (date.getDay() === 5) {
        return 'friday'
    }
}
function getDayNl(date: Date) {
    if (date.getDay() === 5) {
        return 'vrijdag'
    }
}
