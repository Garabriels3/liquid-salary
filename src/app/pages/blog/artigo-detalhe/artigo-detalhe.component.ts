import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { Artigo } from '../../../models/artigo.model';
import { AdBannerComponent } from '../../../components/ad-banner/ad-banner.component';

@Component({
  selector: 'app-artigo-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule, AdBannerComponent],
  templateUrl: './artigo-detalhe.component.html',
  styleUrls: ['./artigo-detalhe.component.scss']
})
export class ArtigoDetalheComponent implements OnInit {
  artigo?: Artigo;
  artigosRelacionados: Artigo[] = [];
  carregando = true;
  erro = false;
  
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.carregarArtigo(slug);
      } else {
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  carregarArtigo(slug: string): void {
    this.carregando = true;
    this.erro = false;
    
    this.blogService.getArtigoPorSlug(slug).subscribe({
      next: (artigo) => {
        if (artigo) {
          this.artigo = artigo;
          this.carregarArtigosRelacionados(artigo.id);
        } else {
          this.erro = true;
        }
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  carregarArtigosRelacionados(artigoId: string): void {
    this.blogService.getArtigosRelacionados(artigoId, 3).subscribe(artigos => {
      this.artigosRelacionados = artigos;
    });
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
} 