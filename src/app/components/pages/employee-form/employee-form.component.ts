import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { MaterialModule } from 'src/app/shared/modules/angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, DynamicFormComponent],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  formType: number = 2; // Assuming 2 is the employee form type
  constructor(private snackBar: MatSnackBar) {}

  handleFormData(formData: any) {
    this.snackBar.open(
      `Saved Successfully, Please check Console for Form Data`,
      'Close',
      {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      }
    );
    console.log('Form Data received in parent  Employee:', formData);
  }
}
