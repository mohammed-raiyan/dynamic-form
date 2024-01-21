import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-dynamic-checkbox-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatCheckboxModule],
  templateUrl: './dynamic-checkbox-list.component.html',
  styleUrls: ['./dynamic-checkbox-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, //using Ng_value_accessor bind the custom form to angular form..
      useExisting: forwardRef(() => DynamicCheckboxListComponent),
      multi: true,
    },
  ],
})
export class DynamicCheckboxListComponent
  implements OnInit, ControlValueAccessor
{
  @Input() options: any[] = [];
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formControls: { [key: string]: FormControl } = {};
    this.options.forEach((option) => {
      formControls[option.value] = this.fb.control(false);
    });

    this.formGroup = this.fb.group(formControls);
    this.propagateChange(this.formGroup.value);
    this.formGroup.valueChanges.subscribe((value) => {
      this.propagateChange(value);
    });
  }

  //#region ControlValueAccessor methods
  private propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    console.log("Inside the writeValue - obj:", obj);
  
    if (!obj) {
      // If obj is undefined or null, set all form controls to null
      Object.keys(this.formGroup.controls).forEach((key) => {
        this.formGroup.get(key)?.setValue(null, { emitEvent: false });
      });
      return;
    }
    // Set values based on obj
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.setValue(obj[key], { emitEvent: false });
    });
  }
  

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
  //#endregion
}
