import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent {
  constructor(
    @Inject(PLATFORM_ID) private pi: Object,
    private _CartService: CartService
  ) {}

  allOrders!: Order[];

  ngOnInit(): void {
    if (isPlatformBrowser(this.pi)) {
      let token: any = localStorage.getItem('token');
      let decodedToken: any = jwtDecode(token);

      this._CartService
        .getUserOrders(decodedToken.id)
        .subscribe((response: Order | any) => {
          this.allOrders = response
        });
    }
  }
}
