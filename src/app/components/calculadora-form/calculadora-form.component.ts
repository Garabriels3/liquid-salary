import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  styleUrls: ['./calculadora-form.component.scss']
})
export class CalculadoraFormComponent implements OnInit {
  @Output() resultadoCalculado = new EventEmitter<{resultado: Resultado, pais: string}>();
  
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
    const formConfig: any = {
      salarioBruto: [null, [Validators.required, Validators.min(1)]]
    };
    
    // Campos para Brasil
    if (this.pais === 'br') {
      formConfig.dependentes = [0];
      formConfig.valeTransporte = [false];
      formConfig.valeRefeicao = [0];
      formConfig.planoSaude = [0];
      formConfig.outrosBeneficios = [0];
    }
    // Campos para Portugal
    else if (this.pais === 'pt') {
      formConfig.dependentes = [0];
      formConfig.estadoCivil = ['solteiro'];
      formConfig.subsidioRefeicao = [0];
    }
    // Campos para Alemanha
    else if (this.pais === 'de') {
      formConfig.steuerklasse = ['1'];
      formConfig.tipoSeguroSaude = ['publico'];
      formConfig.kirchensteuer = [false];
    }
    
    this.formulario = this.fb.group(formConfig);
  }
  
  selecionarPais(novoPais: string): void {
    this.pais = novoPais;
    this.resultado = null;
    this.inicializarFormulario();
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
      },
      error: (erro: Error) => {
        console.error('Erro ao calcular salário:', erro);
        // Tratar erro aqui
      }
    });
  }
  
  obterNomePais(codigoPais: string): string {
    const nomesPaises: {[key: string]: string} = {
      'br': 'Brasil',
      'pt': 'Portugal',
      'de': 'Alemanha',
      'fr': 'França',
      'ch': 'Suíça',
      'it': 'Itália'
    };
    
    return nomesPaises[codigoPais] || codigoPais.toUpperCase();
  }
  
  obterSimboloMoeda(codigoPais: string): string {
    const simbolosMoeda: {[key: string]: string} = {
      'br': 'R$',
      'pt': '€',
      'de': '€',
      'fr': '€',
      'ch': 'CHF',
      'it': '€'
    };
    
    return simbolosMoeda[codigoPais] || '$';
  }
}
