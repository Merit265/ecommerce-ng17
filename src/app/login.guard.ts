import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  let navigate = inject(Router);
  let pid = inject(PLATFORM_ID);

  if (isPlatformBrowser(pid)) {
    if (localStorage.getItem('token')) {
      //3mla login

      navigate.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
