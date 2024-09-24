import { HttpInterceptorFn } from '@angular/common/http';
// import { Token } from '@angular/compiler';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('token') !== null) {
      let userToken: any = { token: localStorage.getItem('token') };

      let reqWithHeaders: any = req.clone({
        setHeaders: userToken,
      });
      return next(reqWithHeaders);
    } else {
      return next(req);
    }
  } else {
    return next(req);
  }
};
