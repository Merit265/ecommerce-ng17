import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { headersInterceptor } from './headers.interceptor';
import { errorsInterceptor } from './errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './loader.interceptor';
import { TranslateLoader, TranslateModule  ,} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , './assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, errorsInterceptor,loaderInterceptor])
    ),

    importProvidersFrom(RouterModule, BrowserAnimationsModule ,  ToastrModule.forRoot(
      {
        positionClass :'toast-bottom-right'
      }
    ) , NgxSpinnerModule , TranslateModule.forRoot(
      {
        // defaultLanguage:'ar',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }
    )),
  ],
};
