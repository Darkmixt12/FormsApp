import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
//import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {


    public myForm : FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern( this.validatorsservice.firstNameAndLastnamePattern) ]],
      email: ['', [Validators.required, Validators.pattern( this.validatorsservice.emailPattern) ], [ EmailValidatorService] ],
      username: ['', [Validators.required], this.validatorsservice.cantBeStrider],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    });


    constructor(
      private fb : FormBuilder,
      private validatorsservice: ValidatorsService
      ){}


    isValidField(field:string){
      return this.validatorsservice.isValidField(this.myForm, field)
    }

    onSubmit() {
      this.myForm.markAllAsTouched();
    }

}
