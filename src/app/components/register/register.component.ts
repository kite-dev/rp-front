import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: any;
  password1: any;
  password2: any;
  public errors: any = [];
  constructor( private _form: FormBuilder,
                private _userService: UserService) { 

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.registerForm = this._form.group({
      email: ['', [Validators.required, Validators.email]],
      password1: [undefined, [Validators.required]],
      password2: [undefined, [Validators.required]],
    })
  }
  submitForm(){
    this._userService.getUser(this.registerForm.value.email).subscribe(
      (data: any) => {
        if(data.length > 0){
          this.errors.push("USER_EXISTS");
          throw new Error("USER_EXISTS");
        }else{
          this._userService.registerUser(this.registerForm.value).subscribe(
            (data: any) => {
              console.log(data);
            },
            (error: any) => {
              console.log(error);
            });
        }
    });
  }
      
    

}
