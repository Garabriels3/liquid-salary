import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './app/pages/home/home.component';

const configService = new ConfigService();

configService.loadConfig().then(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(RouterModule.forRoot([
        { path: '', component: HomeComponent }
      ])),
      ConfigService
    ]
  }).catch(err => console.error(err));
}).catch(err => console.error('Failed to load config', err));
