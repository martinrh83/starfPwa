import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatePipe, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es-AR', localeEsExtra);
//PAGES
import { LoginPage } from "./modules/login/login.page";
import { SignUpPage } from './modules/sign-up/sign-up.page';
import { UpdatePasswordComponent } from './modules/update-password/update-password.component';


//SERVICES
import { ToastService } from './core/services/toast.service';
import { LoaderService } from './core/services/loader.service';
import { RouterService } from './core/services/router.service';
import { HttpService } from './core/services/http.service';
import { MessagingService } from './core/services/messaging.service';
import { AuthService } from './core/services/user/auth.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './core/interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    SignUpPage,
    UpdatePasswordComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    RouterService,
    ToastService,
    AuthService,
    LoaderService,
    HttpService,
    MessagingService,
    { provide: LOCALE_ID, useValue: 'es-AR'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
