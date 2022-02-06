import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  constructor(public alertService: AlertService,
              private _router: Router) { }

  ngOnInit(): void {
  }
  redirectTo(url: string){
   
    this._router.navigate([url]);
  }

}
