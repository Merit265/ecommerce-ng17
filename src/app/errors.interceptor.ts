import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

let toaster = inject(ToastrService)


  return next(req).pipe(
    catchError((err) => {
      //handle error
      toaster.error('something went wrong ');

      return throwError(() => err);
    })
  );
};



