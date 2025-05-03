import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculadora', loadComponent: () => import('./pages/calculadora/calculadora.component').then(m => m.CalculadoraComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/artigo-detalhe/artigo-detalhe.component').then(m => m.ArtigoDetalheComponent) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
