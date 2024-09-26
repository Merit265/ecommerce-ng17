import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {
  NgxSpinner,
  NgxSpinnerComponent,
  NgxSpinnerService,
} from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthonService } from './authon.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';
  isLogin! : any ;
  constructor(private spinner: NgxSpinnerService , private _AuthonService:AuthonService) {}

  ngOnInit(): void {

    this._AuthonService.isLogin.subscribe( val=>{
      this.isLogin = val ;
    })
    
    
  }
}
