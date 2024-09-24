import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart, CartDetails, CartProduct } from '../product';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, LoaderComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  CartData: CartProduct[] = [];

  cartDetails!: CartDetails;

  cartPrice!: Cart;
  emptyMsg!: string;
  loading = false;
  cartId!: string;

  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this.loading = true;
    this._CartService.getCart().subscribe({
      next: (response) => {
        this.loading = false;
        console.log(response);
        this.CartData = response.data.products;
        this.cartDetails = response;
        this.cartId = response.cartId;

        this.cartPrice = response.data;
        if (response.data.products.length == 0) {
          this.emptyMsg = 'your cart is empty';
        }

        console.log('next');
      },
      error: (err) => {
        this.loading = false;
        this.emptyMsg = 'your cart is empty';
        console.log(err);
      },
    });
  }

  updateQnty(id: string, count: number) {
    console.log(count);
    this._CartService.updateCount(id, count).subscribe({
      next: (response: any) => {
        this._CartService.cartItemsCount.set(response.numOfCartItems);
        this.loading = false;
        console.log(response);
        this.CartData = response.data.products;
        this.cartDetails = response;
        this.cartPrice = response.data;
      },
    });
  }
}
