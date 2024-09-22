import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor() {}

  async loadConfig() {
    try {
      const response = await fetch('/assets/config.json');
      this.config = await response.json();
    } catch (error) {
      console.error('Erro ao carregar a configuração:', error);
      this.config = {
        firebaseConfig: {
          // Coloque aqui as configurações padrão do Firebase
          apiKey: "AIzaSyBQmLHymOC0k9drhUvPORNp80sLVikmq98",
          authDomain: "liquid-salary.firebaseapp.com",
          projectId: "liquid-salary",
          storageBucket: "liquid-salary.appspot.com",
          messagingSenderId: "715020667433",
          appId: "1:715020667433:web:db6a748f5d934683edaa38",
          measurementId: "G-46NXFMJSGT"
        }
      };
    }
  }

  getFirebaseConfig() {
    return this.config?.firebaseConfig;
  }
}
