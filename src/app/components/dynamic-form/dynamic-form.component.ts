import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormService } from 'src/app/services/dynamic-form.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldJSON } from 'src/app/shared/models/form-fields';
import { MaterialModule } from 'src/app/shared/modules/angular-material.module';
import { DynamicCheckboxListComponent } from './dynamic-checkbox-list/dynamic-checkbox-list.component';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [DynamicFormService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicCheckboxListComponent,
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() formType!: number; // get FormType from Parent Comp. like login / employee-form / etc.,
  @Output() formDataSubmitted: EventEmitter<any> = new EventEmitter<any>(); //pass form data to parent comp.
  form = this.fb.group({});
  dynamicForm = this.fb.group({});
  formFields!: any;
  screenTitle: string = '';

  constructor(
    private dynamicFormService: DynamicFormService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dynamicFormService.getFormJson(this.formType).subscribe((data) => {
      this.formFields = data.formFields || [];
      this.screenTitle = data.title;
      this.setupDynamicForm(this.formFields);
    });
  }

  //creating dynamic form based on JSON
  private setupDynamicForm(formFields: FormFieldJSON[]) {
    // Create form for form fields
    formFields.forEach((x: any) => {
      x.fields.forEach((field: any) => {
        if (Array.isArray(field)) {
          this.setupDynamicForm(field);
        } else {
          const validators = this.getValidators(field.validations);

          this.form.addControl(
            field.name,
            this.fb.control(
              { value: field.value, disabled: field.disabled },
              validators
            )
          );
        }
      });
    });
  }

  //Adding Validators to form controls based on JSON
  private getValidators(validations: any): any[] {
    const validators = [];
    if (validations?.isRequired) {
      validators.push(Validators.required);
    }
    if (validations?.min !== null) {
      const min = validations?.min ? validations?.min : 0;
      validators.push(Validators.min(min));
    }
    if (validations?.max !== null) {
      const max = validations?.max ? validations?.max : Infinity;
      validators.push(Validators.min(max));
    }
    if (validations?.pattern) {
      const pattern = validations?.pattern;
      validators.push(Validators.pattern(pattern));
    }
    // Add more validators as needed
    return validators;
  }

  onSubmit() {
    const formData = this.form.value;
    console.log('Form Value', formData);
    this.formDataSubmitted.emit(formData);
  }
}
