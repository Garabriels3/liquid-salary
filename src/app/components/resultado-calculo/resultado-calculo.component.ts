import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../models/resultado.model';
import { MoneyFormatPipe } from '../../pipes/money-format.pipe';
import { CalculoSalarioService } from '../../services/calculo-salario.service';

@Component({
  selector: 'app-resultado-calculo',
  standalone: true,
  imports: [CommonModule, MoneyFormatPipe],
  templateUrl: './resultado-calculo.component.html',
  styleUrl: './resultado-calculo.component.scss'
})
export class ResultadoCalculoComponent implements OnChanges {
  @Input() resultado: Resultado | null = null;
  @Input() pais: string = 'BR';
  
  faixaINSS: string = '';
  faixaIRRF: string = '';
  taxaEfetiva: number = 0;
  totalDescontos: number = 0;
  totalBeneficios: number = 0;
  
  constructor(private calculoSalarioService: CalculoSalarioService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resultado'] && this.resultado) {
      this.calcularValoresDerivativos();
      
      if (this.pais === 'BR' && this.resultado.bruto) {
        this.faixaINSS = this.calculoSalarioService.getFaixaINSS(this.resultado.bruto);
        if (this.resultado.detalhesAdicionais && 'baseCalculoIRRF' in this.resultado.detalhesAdicionais) {
          this.faixaIRRF = this.calculoSalarioService.getFaixaIRRF(this.resultado.detalhesAdicionais['baseCalculoIRRF'] as number);
        }
      }
    }
  }
  
  private calcularValoresDerivativos(): void {
    if (!this.resultado) return;
    
    // Calcular total de descontos
    this.totalDescontos = 0;
    if (this.resultado.descontos) {
      Object.keys(this.resultado.descontos).forEach(key => {
        const valor = this.resultado?.descontos[key];
        if (valor !== undefined) {
          this.totalDescontos += valor;
        }
      });
    }
    
    // Calcular total de benefícios
    this.totalBeneficios = 0;
    if (this.resultado.beneficios) {
      // Usar apenas as chaves conhecidas para evitar erros de tipo
      if (this.resultado.beneficios.valeRefeicao !== undefined) {
        this.totalBeneficios += this.resultado.beneficios.valeRefeicao;
      }
      if (this.resultado.beneficios.valeTransporte !== undefined) {
        this.totalBeneficios += this.resultado.beneficios.valeTransporte;
      }
      if (this.resultado.beneficios.outrosBeneficios !== undefined) {
        this.totalBeneficios += this.resultado.beneficios.outrosBeneficios;
      }
    }
    
    // Calcular taxa efetiva (percentual de descontos em relação ao bruto)
    if (this.resultado.bruto > 0) {
      this.taxaEfetiva = (this.totalDescontos / this.resultado.bruto) * 100;
    }
  }
  
  // Helper para verificar se o campo existe e tem valor
  existeValor(categoria: 'descontos' | 'beneficios', campo: string): boolean {
    if (!this.resultado) return false;
    if (categoria === 'descontos') {
      return this.resultado.descontos[campo] !== undefined && this.resultado.descontos[campo] !== 0;
    } else if (categoria === 'beneficios' && this.resultado.beneficios) {
      // Verificação segura para benefícios conhecidos
      switch (campo) {
        case 'valeRefeicao':
          return this.resultado.beneficios.valeRefeicao !== undefined && this.resultado.beneficios.valeRefeicao !== 0;
        case 'valeTransporte':
          return this.resultado.beneficios.valeTransporte !== undefined && this.resultado.beneficios.valeTransporte !== 0;
        case 'outrosBeneficios':
          return this.resultado.beneficios.outrosBeneficios !== undefined && this.resultado.beneficios.outrosBeneficios !== 0;
        default:
          return false;
      }
    }
    return false;
  }
}
