import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp({}),
    AngularFireAnalyticsModule,
    AppComponent // Importe o AppComponent aqui se for standalone
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: 'https://calculadorasalarioliquido.com.br/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
