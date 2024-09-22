import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  async loadConfig() {
    this.config = await firstValueFrom(this.http.get('/assets/config.json'));
    AngularFireModule.initializeApp(this.config.firebaseConfig);

    // Inicializa o Firebase e o Analytics
    const app = initializeApp(this.config.firebaseConfig);
    getAnalytics(app);
  }

  getFirebaseConfig() {
    return this.config.firebaseConfig;
  }
}
