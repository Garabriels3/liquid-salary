import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { HomeComponent } from './app/pages/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

const configService = new ConfigService();

configService.loadConfig().then((config) => {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        RouterModule.forRoot([
          { path: '', component: HomeComponent }
        ]),
        AngularFireModule.initializeApp(configService.getFirebaseConfig()),
        AngularFireAnalyticsModule
      ),
      ConfigService
    ]
  }).catch(err => console.error('Erro ao inicializar a aplicação:', err));
}).catch(err => console.error('Falha ao carregar a configuração:', err));
