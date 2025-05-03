import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResultadoCalculoComponent } from '../resultado-calculo/resultado-calculo.component';
import { Resultado } from '../../models/resultado.model';
import { SalarioService } from '../../services/salario.service';

@Component({
  selector: 'app-calculadora-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ResultadoCalculoComponent],
  templateUrl: './calculadora-form.component.html',
  styleUrl: './calculadora-form.component.scss'
})
export class CalculadoraFormComponent implements OnInit {
  @Output() resultadoCalculado = new EventEmitter<{resultado: Resultado, pais: string}>();
  @ViewChild('resultadoElement') resultadoElement!: ElementRef;
  
  formulario!: FormGroup;
  pais: string = 'br';
  resultado: Resultado | null = null;
  
  paises: string[] = ['br', 'pt', 'de', 'fr', 'ch', 'it'];
  
  constructor(
    private fb: FormBuilder,
    private salarioService: SalarioService
  ) {}
  
  ngOnInit(): void {
    this.inicializarFormulario();
  }
  
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      salarioBruto: [null, [Validators.required, Validators.min(1)]],
      dependentes: [0, Validators.min(0)],
      valeTransporte: [false],
      valeRefeicao: [0],
      planoSaude: [0],
      outrosBeneficios: [0],
      estadoCivil: ['solteiro'],
      subsidioRefeicao: [0],
      steuerklasse: ['1'],
      tipoSeguroSaude: ['publico'],
      kirchensteuer: [false]
    });
  }
  
  selecionarPais(pais: string): void {
    this.pais = pais;
    // Manter o valor do salário bruto
    const salarioBruto = this.formulario.get('salarioBruto')?.value;
    this.inicializarFormulario();
    this.formulario.get('salarioBruto')?.setValue(salarioBruto);
  }
  
  obterNomePais(paisCodigo: string): string {
    const nomesPaises: { [key: string]: string } = {
      'br': 'Brasil',
      'pt': 'Portugal',
      'de': 'Alemanha',
      'fr': 'França',
      'ch': 'Suíça',
      'it': 'Itália'
    };
    
    return nomesPaises[paisCodigo] || paisCodigo.toUpperCase();
  }
  
  obterSimboloMoeda(codigoPais: string): string {
    const simbolosMoeda: { [key: string]: string } = {
      'br': 'R$',
      'pt': '€',
      'de': '€',
      'fr': '€',
      'ch': 'CHF',
      'it': '€'
    };
    
    return simbolosMoeda[codigoPais] || '$';
  }
  
  calcular(): void {
    if (this.formulario.invalid) {
      return;
    }
    
    const dadosFormulario = { ...this.formulario.value, pais: this.pais };
    
    this.salarioService.calcularSalario(dadosFormulario).subscribe({
      next: (resultado: Resultado) => {
        this.resultado = resultado;
        this.resultadoCalculado.emit({ resultado, pais: this.pais });
        
        // Rolar para a seção de resultado após um pequeno delay
        setTimeout(() => {
          this.scrollParaResultado();
        }, 100);
      },
      error: (erro: Error) => {
        console.error('Erro ao calcular salário:', erro);
        // Tratar erro aqui
      }
    });
  }
  
  scrollParaResultado(): void {
    if (this.resultadoElement) {
      const resultadoEl = this.resultadoElement.nativeElement;
      resultadoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback para quando a referência direta não está disponível
      const resultadoEl = document.querySelector('.resultado-container');
      if (resultadoEl) {
        resultadoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
