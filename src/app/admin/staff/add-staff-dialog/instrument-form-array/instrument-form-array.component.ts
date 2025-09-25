import { NgIf } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddStaffStore } from '../add-staff-store/add-staff.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-instrument-form-array',
    imports: [
        ReactiveFormsModule,
        // NgIf,
        MatFormFieldModule,
        MatButtonModule,
        MatInput,
        MatIconModule
    ],
    templateUrl: './instrument-form-array.component.html',
    styleUrl: './instrument-form-array.component.scss'
})
export class InstrumentFormArrayComponent {
    form: FormGroup;
    addStaffStore = inject(AddStaffStore);
    staffMember = this.addStaffStore.staffMember;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            instruments: this.fb.array([
                this.fb.control('', Validators.required)
            ])
            // instruments: this.fb.array([])
        });
        effect(() => {
            console.log(this.addStaffStore.staffMember().instruments);
            const instruments = this.addStaffStore.staffMember().instruments
            this.populateFormArray(instruments)
        })
    }



    get instruments(): FormArray {
        return this.form.get('instruments') as FormArray;
    }

    addInstrument() {
        this.instruments.push(this.fb.control('', Validators.required));
    }

    removeInstruments(index: number) {
        this.instruments.removeAt(index);
    }

    onSubmit() {
        // console.log(this.form.value);
        const instruments = this.form.value.instruments;
        console.log(instruments)
        this.addStaffStore.addInstrumentsToStaffMember(instruments)
    }



    populateFormArray(instrumentsArray: string[]) {
        this.instruments.clear(); // ✅ Important to avoid duplicates or old controls

        instrumentsArray
            .filter(instrument => instrument.trim() !== '') // Optional: skip blanks
            .forEach(instrument => {
                this.instruments.push(
                    this.fb.control(instrument, Validators.required)
                );
            });
    }
}

