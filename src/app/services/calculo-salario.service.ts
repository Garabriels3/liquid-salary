import { Injectable } from '@angular/core';
import { Salario } from '../models/salario.model';

@Injectable({
  providedIn: 'root'
})
export class CalculoSalarioService {
  calcularSalarioLiquido(salarioBruto: number, outrosDescontos: number = 0): Salario {
    const inss = this.calcularINSS(salarioBruto);
    const baseCalculo = salarioBruto - inss;
    const irrf = this.calcularIRRF(baseCalculo);
    const salarioLiquido = salarioBruto - inss - irrf - outrosDescontos;

    return {
      bruto: salarioBruto,
      liquido: salarioLiquido,
      descontos: {
        inss,
        irrf,
        outrosDescontos
      }
    };
  }

  private calcularINSS(salarioBruto: number): number {
    // Implementar lógica de cálculo do INSS
    // Este é um exemplo simplificado
    if (salarioBruto <= 1100) {
      return salarioBruto * 0.075;
    } else if (salarioBruto <= 2203.48) {
      return salarioBruto * 0.09;
    } else if (salarioBruto <= 3305.22) {
      return salarioBruto * 0.12;
    } else {
      return salarioBruto * 0.14;
    }
  }

  private calcularIRRF(baseCalculo: number): number {
    // Implementar lógica de cálculo do IRRF
    // Este é um exemplo simplificado
    if (baseCalculo <= 1903.98) {
      return 0;
    } else if (baseCalculo <= 2826.65) {
      return (baseCalculo * 0.075) - 142.80;
    } else if (baseCalculo <= 3751.05) {
      return (baseCalculo * 0.15) - 354.80;
    } else if (baseCalculo <= 4664.68) {
      return (baseCalculo * 0.225) - 636.13;
    } else {
      return (baseCalculo * 0.275) - 869.36;
    }
  }
}
