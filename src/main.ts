import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './app/pages/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

const firebaseConfig = {
  // Coloque sua configuração do Firebase aqui
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', component: HomeComponent }
      ]),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAnalyticsModule
    )
  ]
}).catch(err => console.error(err));
