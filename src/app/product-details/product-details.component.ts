import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  singleProduct!: Product;
  productId: any;


  ngOnInit(): void {
    // 5at el id mn el URL
    this.productId = this._ActivatedRoute.snapshot.params['pId'];
    

    this._ProductsService
      .getSepecificProduct(this.productId)
      .subscribe((response: any) => {
        this.singleProduct = response.data;
      });
  }
}
