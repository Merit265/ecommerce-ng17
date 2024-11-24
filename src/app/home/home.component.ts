import {
  CommonModule,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import {
  afterNextRender,
  afterRender,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ProductsService } from '../products.service';
import { Category, Product } from '../product';
import { LoaderComponent } from '../loader/loader.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from '../categories/categories.component';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { CartItem } from '../order';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoaderComponent,
    CategoriesComponent,
    CategorySliderComponent,
    RouterLink,
    FormsModule,
    SearchPipe,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) {}

  pname: string = '';
  loading = false;

  allProducts!: Product[];
  allCategories!: Category[];
  loadingStates: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this._ProductsService
      .getAllProducts()
      .pipe(
        map((res) => {
          res.data = res.data.map((elem: any) => {
            elem.price = elem.price * 10;

            return elem;
          });
          return res;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.allProducts = response.data;
        },
      });

    // categoriess

    this._ProductsService.getAllCategories().subscribe({
      next: (respponse) => {
        this.allCategories = respponse.data;
        console.log(this.allCategories);
      },
    });

    this._CartService.getCart().subscribe((data) => {
      this._CartService.cartItemsCount.set(data.numOfCartItems);
    });

    // version >> angular

    // version >> react

    // version >> jquery-js
  }

  addToCart(id: string) {
    this.loadingStates[id] = true; // Set loading for the specific product
    this._CartService
      .addProductToCart(id, localStorage.getItem('token'))
      .subscribe((response) => {
        this.loadingStates[id] = false;
        this._CartService.cartItemsCount.set(response.numOfCartItems);
        this.toastr.success('product add to cart!')
      });
  }
}
