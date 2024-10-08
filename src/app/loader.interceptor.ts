import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner = inject(NgxSpinnerService);
  // if (req.method.toLowerCase() == 'get') {
  // if (req.url == 'https://ecommerce.routemisr.com/api/v1/products') {
  //   spinner.show('ball');
  // }

  // spinner.show('ball');

  return next(req).pipe(
    finalize(() => {
      spinner.hide('ball');
    })
  );
};
