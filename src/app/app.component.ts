import { Component } from '@angular/core';

import { filter , subscribeOn} from 'rxjs/operators';

import { NavigationEnd, NavigationError, NavigationStart, Router , Event} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rp-front';
  public hideNavBar = false;
  constructor(private _router: Router){
   _router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){
        if(event.url === '/login' || event.url === '/' || event.url === '/register'){
          this.hideNavBar = true;
        } else {
          if(!localStorage.getItem('user')){
            this._router.navigate(['login']);
          } else {
            this.hideNavBar = false;
          }
          
        }
      }
    });
  }
}
