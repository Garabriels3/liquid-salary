import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  // Remova a propriedade title se não estiver sendo usada
}
