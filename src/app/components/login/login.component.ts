import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    private _route: ActivatedRoute,
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
        console.log("entra aqui?")
        console.log(data)
        if(data.message==='USER_EXISTNT'){
          this.errors.push("USER_EXISTNT");
          throw new Error("USER_EXISTNT");
        }else{
          this._router.navigate(['/login']);
        }
    },
    (error: any) => {
      console.log("aca en error")
      console.log(error)
    });
  }


}
