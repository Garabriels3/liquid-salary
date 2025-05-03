import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Artigo, Categoria } from '../../models/artigo.model';
import { AdBannerComponent } from '../../components/ad-banner/ad-banner.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, AdBannerComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  artigos: Artigo[] = [];
  artigosDestaque: Artigo[] = [];
  categorias: Categoria[] = [];
  categoriaAtual: string | null = null;
  
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.carregarArtigos();
    this.carregarCategorias();
  }

  carregarArtigos(): void {
    this.blogService.getArtigos().subscribe(artigos => {
      this.artigos = artigos.sort((a, b) => 
        new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
      );
    });
    
    this.blogService.getArtigosDestaque().subscribe(artigos => {
      this.artigosDestaque = artigos;
    });
  }

  carregarCategorias(): void {
    this.blogService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  filtrarPorCategoria(slug: string | null): void {
    this.categoriaAtual = slug;
    
    if (slug) {
      this.blogService.getArtigosPorCategoria(slug).subscribe(artigos => {
        this.artigos = artigos.sort((a, b) => 
          new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
        );
      });
    } else {
      this.carregarArtigos();
    }
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
} 