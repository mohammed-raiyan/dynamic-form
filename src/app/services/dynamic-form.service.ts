import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DynamicFormService {
  constructor(private http: HttpClient) {}

  getFormJson(formType: number): Observable<any> {
    let formUrl: string;
    // Choose the form JSON file based on the formType parameter
    switch (formType) {
      case 1:
        formUrl = 'assets/login-form.json';
        break;
      case 2:
        formUrl = 'assets/employee-form.json';
        break;
      default:
        // Default to a generic form or handle other cases
        formUrl = 'assets/default-form.json';
    }
    return this.http.get<any>(formUrl);
  }
}
