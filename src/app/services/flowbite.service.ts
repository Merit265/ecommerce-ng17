// src/app/services/flowbite.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // Dynamically load Flowbite only in browser environment
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite')
        .then((flowbite) => {
          callback(flowbite);
        })
        .catch((err) => {
          console.error('Error loading Flowbite:', err);
        });
    }
  }
}
