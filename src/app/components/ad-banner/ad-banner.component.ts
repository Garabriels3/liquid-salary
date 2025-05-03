import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [id]="adSlotId" class="ad-container" [ngClass]="positionClass">
      <div *ngIf="!adsLoaded" class="ad-placeholder">
        <!-- Placeholder para o anúncio enquanto carrega -->
        <p>Carregando conteúdo...</p>
      </div>
    </div>
  `,
  styles: [`
    .ad-container {
      display: block;
      text-align: center;
      overflow: hidden;
      margin: 1.5rem auto;
      min-height: 100px;
      background-color: #f9f9f9;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .ad-placeholder {
      padding: 1.5rem;
      color: #888;
      font-style: italic;
      font-size: 0.9rem;
    }
    
    .ad-horizontal {
      min-height: 100px;
      width: 100%;
      max-width: 728px;
    }
    
    .ad-vertical {
      min-height: 600px;
      width: 300px;
    }
    
    .ad-responsive {
      width: 100%;
      height: auto;
    }
  `]
})
export class AdBannerComponent implements OnInit, AfterViewInit {
  @Input() adSlotId: string = 'ad-slot-default';
  @Input() adFormat: 'horizontal' | 'vertical' | 'responsive' = 'responsive';
  @Input() adSlot?: string; // ID do slot fornecido pelo Google AdSense
  
  adsLoaded = false;
  positionClass = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Define a classe baseada no formato do anúncio
    this.positionClass = `ad-${this.adFormat}`;
    
    // Inicializa o Google AdSense se ainda não estiver carregado
    if (typeof window !== 'undefined' && !window['adsbygoogle']) {
      this.loadAdSenseScript();
    }
  }

  ngAfterViewInit(): void {
    // Tenta carregar anúncios após a view ser inicializada
    this.tryLoadAds();
  }

  private loadAdSenseScript(): void {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.onload = () => {
        // Configuração inicial do AdSense
        // Substituir 'ca-pub-XXXXXXX' pelo ID real da sua conta AdSense quando disponível
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
          google_ad_client: 'ca-pub-XXXXXXXXXXXXXXXX', 
          enable_page_level_ads: true
        });
        
        this.tryLoadAds();
      };
      document.head.appendChild(script);
    }
  }

  private tryLoadAds(): void {
    // Tenta carregar os anúncios quando o script do AdSense estiver disponível
    if (typeof window !== 'undefined' && window['adsbygoogle']) {
      setTimeout(() => {
        this.adsLoaded = true;
        try {
          (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
        } catch (e) {
          console.error('Erro ao carregar anúncios:', e);
        }
      }, 200);
    }
  }
} 