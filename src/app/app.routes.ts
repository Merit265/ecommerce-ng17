import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { pathGuard } from './path.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [pathGuard] },
  {
    path: 'allorders',
    component: AllordersComponent,
    canActivate: [pathGuard],
  },

  { path: 'cart', component: CartComponent, canActivate: [pathGuard] },
  {
    path: 'checkout/:cartId',
    component: CheckoutComponent,
    canActivate: [pathGuard],
  },

  //productDeatils/65465454564654 (parameter)
  {
    path: 'productDetails/:pId/:pName',
    component: ProductDetailsComponent,
    canActivate: [pathGuard],
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./brands/brands.component').then((c) => c.BrandsComponent),
    canActivate: [pathGuard],
  },

  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [pathGuard],
  },
  { path: 'products', component: ProductsComponent, canActivate: [pathGuard] },

  { path: '**', component: NotfoundComponent },
];
