import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [CommonModule, DynamicFormComponent, MaterialModule],
})
export class LoginPageComponent {
  formType: number = 1; // Assuming 2 is the login form type
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  handleFormData(formData: any) {
    console.log('Form Data received in parent Login:', formData);
    if (
      formData.username != undefined ||
      (null && formData.password != undefined) ||
      null
    ) {
      this.openSnackBar();
      this.router.navigate(['pages/home']);
    }
  }

  openSnackBar() {
    this.snackBar.open(`Logged In successfully.`, 'Close', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
