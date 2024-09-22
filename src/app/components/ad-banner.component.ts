import { Component, Input, OnInit } from '@angular/core';

// Declare o tipo global para window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Component({
  selector: 'app-ad-banner',
  template: `
    <div *ngIf="adLoaded">
      <ins class="adsbygoogle"
           style="display:block"
           [attr.data-ad-client]="adClient"
           [attr.data-ad-slot]="adSlot"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  `,
  standalone: true
})
export class AdBannerComponent implements OnInit {
  @Input() adClient: string = 'ca-pub-XXXXXXXXXXXXXXXX'; // Substitua pelo seu ID de publicador
  @Input() adSlot: string = '';
  adLoaded: boolean = false;

  ngOnInit() {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        this.adLoaded = true;
      } else {
        console.log('AdSense not loaded');
      }
    } catch (e) {
      console.error('Error initializing ad', e);
    }
  }
}
