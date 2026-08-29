import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFormBuilderService {

  public buildCreateNewProjectForm(): FormGroup {
    return new FormGroup({
      projectName: new FormControl('', [
        Validators.required,
      ]),
      projectDescription: new FormControl('', [
      ]),
    }
      , {
        updateOn: 'submit'
      });
  }
}
