import { isPlatformBrowser } from '@angular/common';
import { 
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly translate = inject(TranslateService);
  constructor(
    @Inject(PLATFORM_ID) private pid: object,
   
  ) {
    if (isPlatformBrowser(pid)) {
      //use when refresh
      if (localStorage.getItem('lang') !== null) {
        console.log('translation service');

        let selectedLang = localStorage.getItem('lang');

        this.translate.use(selectedLang!);
        this.changeDirection();
      } else {
        this.translate.setDefaultLang('en');
      }
    }
  }

  changeDirection() {
    let selectedLang = localStorage.getItem('lang');

    if (selectedLang == 'en') {
       document.documentElement.dir = 'ltr';
    
    } else if (selectedLang == 'ar') {
      document.documentElement.dir = 'rtl';
     
    }
  }

  changeLang(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.changeDirection();
  }
}
