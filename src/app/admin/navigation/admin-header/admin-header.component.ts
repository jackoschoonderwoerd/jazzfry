import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/auth.store';

@Component({
    selector: 'app-admin-header',
    imports: [MatToolbarModule, MatButtonModule, RouterModule],
    templateUrl: './admin-header.component.html',
    styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

}
