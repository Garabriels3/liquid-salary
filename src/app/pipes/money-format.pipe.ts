import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat',
  standalone: true
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, pais: string = 'BR'): string {
    if (value === null || value === undefined) {
      return '-';
    }
    
    const currencyConfig: {[key: string]: string} = {
      'BR': 'BRL',
      'PT': 'EUR',
      'DE': 'EUR',
      'FR': 'EUR',
      'CH': 'CHF',
      'IT': 'EUR'
    };
    
    const localeConfig: {[key: string]: string} = {
      'BR': 'pt-BR',
      'PT': 'pt-PT',
      'DE': 'de-DE',
      'FR': 'fr-FR',
      'CH': 'de-CH',
      'IT': 'it-IT'
    };
    
    const currency = currencyConfig[pais] || 'BRL';
    const locale = localeConfig[pais] || 'pt-BR';
    
    return value.toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
