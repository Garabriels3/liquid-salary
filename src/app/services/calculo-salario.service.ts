import { Injectable } from '@angular/core';
import { Salario } from '../models/salario.model';

@Injectable({
  providedIn: 'root'
})
export class CalculoSalarioService {
  calcularSalarioLiquido(salarioBruto: number, numeroDependentes: number, outrosBeneficios: number, outrosDescontos: number): Salario {
    const inss = this.calcularINSS(salarioBruto);
    const baseCalculo = salarioBruto - inss - (numeroDependentes * 189.59); // Dedução por dependente em 2023
    const irrf = this.calcularIRRF(baseCalculo);
    const salarioLiquido = salarioBruto - inss - irrf - outrosDescontos + outrosBeneficios;

    return {
      bruto: salarioBruto,
      liquido: salarioLiquido,
      descontos: {
        inss,
        irrf,
        outrosDescontos
      },
      beneficios: {
        outrosBeneficios
      }
    };
  }

  private calcularINSS(salarioBruto: number): number {
    if (salarioBruto <= 1412.00) return salarioBruto * 0.075;
    if (salarioBruto <= 2666.68) return salarioBruto * 0.09;
    if (salarioBruto <= 4000.03) return salarioBruto * 0.12;
    if (salarioBruto <= 7786.02) return salarioBruto * 0.14;
    return 7786.02 * 0.14; // Teto do INSS
  }

  private calcularIRRF(baseCalculo: number): number {
    if (baseCalculo <= 2112.00) return 0;
    if (baseCalculo <= 2826.65) return (baseCalculo * 0.075) - 158.40;
    if (baseCalculo <= 3751.05) return (baseCalculo * 0.15) - 370.40;
    if (baseCalculo <= 4664.68) return (baseCalculo * 0.225) - 651.73;
    return (baseCalculo * 0.275) - 884.96;
  }

  getFaixaINSS(salarioBruto: number): string {
    if (salarioBruto <= 1412.00) return "7,5%";
    if (salarioBruto <= 2666.68) return "9%";
    if (salarioBruto <= 4000.03) return "12%";
    return "14%";
  }

  getFaixaIRRF(baseCalculo: number): string {
    if (baseCalculo <= 2112.00) return "Isento";
    if (baseCalculo <= 2826.65) return "7,5%";
    if (baseCalculo <= 3751.05) return "15%";
    if (baseCalculo <= 4664.68) return "22,5%";
    return "27,5%";
  }
}
