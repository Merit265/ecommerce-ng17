import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthonService } from './authon.service';

export const pathGuard: CanActivateFn = (route, state) => {
  // no constructorrrrrrr  DI?????

  let _AuthonService = inject(AuthonService);
  let _Router = inject(Router);

  if (_AuthonService.isLogin.value) {
    console.log(_AuthonService.isLogin.value);
    

    return true;
  } else {
    console.log(_AuthonService.isLogin.value);
    _Router.navigate(['/login']);
    return false;
  }
};
