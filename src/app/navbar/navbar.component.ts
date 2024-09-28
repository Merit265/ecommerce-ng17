import {
  ChangeDetectorRef,
  Component,
  computed,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthonService } from '../authon.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../translation.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { FlowbiteService } from '../services/flowbite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  navLinks: any = [
    { path: 'home', name: 'Home' },
    { path: 'products', name: 'Products' },
    { path: 'brands', name: 'Brands' },
    { path: 'categories', name: 'Categories' },
  ];

  showLinks: boolean = false;
  cartItems = computed(() => this.cart.cartItemsCount());

  loggedUserName: string = '';
  selectedLanguage: string = 'en';

  constructor(
    private _AuthonService: AuthonService,
    private _Router: Router,
    private _TranslateService: TranslationService,
    private cart: CartService,
    private flowbiteService: FlowbiteService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded successfully:', flowbite);
    });

    this._AuthonService.isLogin.subscribe((value) => {
      this.showLinks = value;

      console.log('hello from navbar');
    });

    this._AuthonService.userName.subscribe((value) => {
      this.loggedUserName = value;
    });
    this.cart.getCart().subscribe((data) => {
      console.log(data);
    });
  }

  logOut() {
    this._Router.navigate(['/login']);
    // this.showLinks = false;
    this._AuthonService.isLogin.next(false);
    localStorage.removeItem('token');
  }

  changeLang(lang: string) {
    alert('444');
    this._TranslateService.changeLang(lang);
  }
}
