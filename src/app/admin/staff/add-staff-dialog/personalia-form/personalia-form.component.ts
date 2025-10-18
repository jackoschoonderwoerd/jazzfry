import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Personalia, StaffMember } from '../../../../models/staff-member';
import { AddStaffStore } from '../add-staff-store/add-staff.store';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { normalizeFormValues } from '../../../../shared/helper-functions/normalize_formvalues';

@Component({
    selector: 'app-personalia-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        MatButtonModule
    ],
    templateUrl: './personalia-form.component.html',
    styleUrl: './personalia-form.component.scss'
})
export class PersonaliaFormComponent {


    addStaffStore = inject(AddStaffStore);
    staffMember = this.addStaffStore.staffMember;
    form: FormGroup;





    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            firstName: new FormControl('', [Validators.required]),
            particles: new FormControl(''),
            lastName: new FormControl('', [Validators.required])

        })
        effect(() => {
            this.form.patchValue(this.staffMember().personalia)
        })

    }
    onSubmit() {
        const formValue = normalizeFormValues(this.form.value)
        const personalia: Personalia = {
            firstName: formValue.firstName,
            particles: formValue.particles,
            lastName: formValue.lastName
        }
        this.form.reset();
        // this.addStaffStore.addStaffMember(staffMember);
        this.addStaffStore.updatePersonalia(personalia);
    }


}
