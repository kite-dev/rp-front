import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public errors: any = [];
  constructor( private _form: FormBuilder,
    private _userService: UserService) { 

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.loginForm = this._form.group({
      email: ['', [Validators.required, Validators.email]],
      password1: [undefined, [Validators.required]],
      password2: [undefined, [Validators.required]],
    })
  }
  submitForm(){
    this._userService.getUser(this.loginForm.value).subscribe(
      (data: any) => {
        if(data.length === 0){
          this.errors.push("USER_EXISTS");
          throw new Error("USER_EXISTS");
        }else{
          
        }
    });
  }


}
