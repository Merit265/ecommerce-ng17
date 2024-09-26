import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner = inject(NgxSpinnerService);
  if (req.url.includes('products' ) ||  req.url === 'https://ecommerce.routemisr.com/api/v1/cart') {
    spinner.show('ball');
  } else {
    spinner.show('box');
  }

  return next(req).pipe(
    finalize(() => {
      spinner.hide('box');
      spinner.hide('ball');
    })
  );
};