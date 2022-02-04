import { Component, OnInit } from '@angular/core';
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
  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
  }

}
