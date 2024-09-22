import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CalculoSalarioService } from '../../services/calculo-salario.service';
import { Salario } from '../../models/salario.model';
import { MoneyFormatPipe } from '../../pipes/money-format.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MoneyFormatPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [provideNgxMask()]
})
export class HomeComponent {
  salarioForm: FormGroup;
  resultado: Salario | null = null;
  faixaINSS: string = '';
  faixaIRRF: string = '';
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private calculoSalarioService: CalculoSalarioService,
    private analytics: AngularFireAnalytics
  ) {
    this.salarioForm = this.fb.group({
      salarioBruto: ['', [Validators.required, Validators.min(0)]],
      numeroDependentes: [0, [Validators.required, Validators.min(0)]],
      outrosBeneficios: ['', [Validators.min(0)]],
      outrosDescontos: ['', [Validators.min(0)]]
    });

    this.analytics.logEvent('page_view', { page_name: 'home' });
  }

  calcularSalario() {
    if (this.salarioForm.valid) {
      const salarioBruto = this.parseCurrency(this.salarioForm.get('salarioBruto')?.value);
      const numeroDependentes = this.salarioForm.get('numeroDependentes')?.value;
      const outrosBeneficios = this.parseCurrency(this.salarioForm.get('outrosBeneficios')?.value);
      const outrosDescontos = this.parseCurrency(this.salarioForm.get('outrosDescontos')?.value);

      this.resultado = this.calculoSalarioService.calcularSalarioLiquido(salarioBruto, numeroDependentes, outrosBeneficios, outrosDescontos);
      this.faixaINSS = this.calculoSalarioService.getFaixaINSS(salarioBruto);
      this.faixaIRRF = this.calculoSalarioService.getFaixaIRRF(salarioBruto - this.resultado.descontos.inss);

      this.analytics.logEvent('calculo_realizado', {
        salario_bruto: salarioBruto,
        numero_dependentes: numeroDependentes,
        outros_beneficios: outrosBeneficios,
        outros_descontos: outrosDescontos,
        faixa_inss: this.faixaINSS,
        faixa_irrf: this.faixaIRRF
      });
    } else {
      this.analytics.logEvent('erro_calculo', {
        erro: 'Formulário inválido',
        campos_invalidos: this.getInvalidFields()
      });
    }
  }

  formatarValor(campo: string) {
    let valor = this.salarioForm.get(campo)?.value;
    if (valor) {
      // Remove todos os caracteres não numéricos
      valor = valor.replace(/\D/g, '');
      // Converte para número
      let valorNumerico = parseFloat(valor) / 100;
      // Formata o valor
      const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // Atualiza o valor no formulário
      this.salarioForm.get(campo)?.setValue(valorFormatado, { emitEvent: false });
      this.analytics.logEvent('campo_formatado', { campo: campo });
    }
  }

  parseCurrency(value: string | number): number {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    // Converte para número e divide por 100 para considerar os centavos
    return parseFloat(numericValue) / 100;
  }

  getInvalidFields(): string[] {
    const invalidFields = [];
    for (const field in this.salarioForm.controls) {
      if (this.salarioForm.get(field)?.invalid) {
        invalidFields.push(field);
      }
    }
    return invalidFields;
  }

  // Adicione esses métodos para rastrear interações do usuário
  onFocusField(fieldName: string) {
    this.analytics.logEvent('campo_focado', { campo: fieldName });
  }

  onBlurField(fieldName: string) {
    this.analytics.logEvent('campo_desfocado', { campo: fieldName });
  }

  onInfoHover(infoType: string) {
    this.analytics.logEvent('info_hover', { tipo: infoType });
  }

  get salarioBruto() { return this.salarioForm.get('salarioBruto'); }
  get numeroDependentes() { return this.salarioForm.get('numeroDependentes'); }
  get outrosBeneficios() { return this.salarioForm.get('outrosBeneficios'); }
  get outrosDescontos() { return this.salarioForm.get('outrosDescontos'); }
}
