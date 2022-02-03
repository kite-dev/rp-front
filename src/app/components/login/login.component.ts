import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../../service/user.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public errors: any = [];
  constructor( private _form: FormBuilder,
    private _userService: UserService,
    private _router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.loginForm = this._form.group({
      email: ['', [Validators.required, Validators.email]],
      password: [undefined, [Validators.required]],
    })
  }
  submitForm(){
    this._userService.login(this.loginForm.value).subscribe(
      (data: any) => {
        if(data.message==='USER_FOUNDNT'){
          this.errors.push("USER_FOUNDNT");
          throw new Error("USER_FOUNDNT");
        }else{
          localStorage.setItem('user', JSON.stringify(this.loginForm.value.email));
          this._router.navigate(['home']);
          return false;
        }
    },
    (error: any) => {
      console.log(error)
    });
  }


}
