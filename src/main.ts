import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { HomeComponent } from './app/pages/home/home.component'; // Caminho corrigido

const routes: Routes = [
  { path: '', component: HomeComponent },
  // Adicione outras rotas aqui, se necessário
];

const configService = new ConfigService();

configService.loadConfig().then(() => {
  const firebaseConfig = configService.getFirebaseConfig();

  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAnalyticsModule
      ),
      ConfigService
    ]
  }).catch(err => console.error(err));
}).catch(err => console.error('Failed to load config', err));
