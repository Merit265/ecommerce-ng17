import { HttpClient } from '@angular/common/http';
import {
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly index = 10;

  x: Signal<number> = signal(100).asReadonly();
  cartItemsCount: WritableSignal<number> = signal(0);

  constructor(private _HttpClient: HttpClient) {
    effect(() => {
      if( typeof localStorage !== 'undefined'){
        localStorage.setItem('count', this.cartItemsCount().toString());

      }
     
      console.log('effect runn!!!');
    });
  }

  addProductToCart(pId: string, userToken: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: pId },
      {
        headers: {
          token: userToken,
        },
      }
    );
  }

  getCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  updateCount(pId: string, qnty: number) {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
      { count: qnty }
    );
  }

  checkOutSession(cartId: string, address: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: address,
      }
    );
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
}
