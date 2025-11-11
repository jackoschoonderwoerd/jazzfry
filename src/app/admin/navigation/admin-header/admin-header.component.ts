import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/auth.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-admin-header',
    imports: [MatToolbarModule, MatButtonModule, RouterModule, MatIconModule],
    templateUrl: './admin-header.component.html',
    styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

}
