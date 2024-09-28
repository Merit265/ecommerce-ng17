import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner = inject(NgxSpinnerService);
  if (req.method.toLowerCase() == 'get') {
    spinner.show('ball');
  }

  return next(req).pipe(
    finalize(() => {
      spinner.hide('box');
      spinner.hide('ball');
    })
  );
};
