import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAnalyticsModule
    ),
    provideRouter(routes),
    ScreenTrackingService,
    UserTrackingService
  ]
}).catch(err => console.error(err));
