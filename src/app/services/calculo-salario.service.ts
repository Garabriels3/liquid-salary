import { Injectable } from '@angular/core';
import { Salario } from '../models/salario.model';

@Injectable({
  providedIn: 'root'
})
export class CalculoSalarioService {

  // Método principal unificado
  calcular(pais: string, dadosFormulario: any): Salario | null {
    try {
      switch (pais) {
        case 'BR':
          return this._calcularBR(dadosFormulario);
        case 'PT':
          return this._calcularPT(dadosFormulario);
        case 'DE':
           return this._calcularDE(dadosFormulario);
        // Adicionar casos para FR, CH, IT...
        default:
          console.warn(`Cálculo para país ${pais} não suportado.`);
          return null;
      }
    } catch (error) {
        console.error(`Erro ao calcular para ${pais}:`, error);
        return null; // Retorna null em caso de erro interno
    }
  }

  // --- Cálculo Brasil (Adaptado do método antigo) ---
  private _calcularBR(dados: any): Salario | null {
    // Extrair e validar dados específicos do BR
    const salarioBruto = dados.salarioBruto;
    const numeroDependentes = dados.numeroDependentes ?? 0;
    const outrosBeneficios = dados.outrosBeneficios ?? 0;
    const outrosDescontos = dados.outrosDescontos ?? 0;

    // Validar dados numéricos (parseCurrency já deve ter sido feito no componente)
     if (typeof salarioBruto !== 'number' || salarioBruto < 0 || typeof numeroDependentes !== 'number' || numeroDependentes < 0) {
        console.error("Dados inválidos para cálculo BR");
        return null;
    }

    const inss = this._calcularINSS_BR(salarioBruto);
    const baseCalculoIRRF = salarioBruto - inss - (numeroDependentes * 189.59); // TODO: Usar valor de dedução atualizado!
    const irrf = this._calcularIRRF_BR(baseCalculoIRRF);
    const salarioLiquido = salarioBruto - inss - irrf - outrosDescontos; // Benefícios não entram no líquido diretamente

    return {
      bruto: salarioBruto,
      liquido: salarioLiquido,
      descontos: {
        inss: inss,
        irrf: irrf,
        outrosDescontos: outrosDescontos
      },
      pais: 'BR',
      moeda: 'BRL',
      // Adicionar taxa efetiva e detalhes se necessário
       detalhesAdicionais: {
         // Faixas podem vir daqui
         baseCalculoIRRF: baseCalculoIRRF
       }
    };
  }

  // Métodos auxiliares para BR (mantidos privados)
  private _calcularINSS_BR(salarioBruto: number): number {
     // TODO: Atualizar com tabela INSS 2024/2025 e cálculo progressivo correto!
     // Cálculo atual é simplificado e provavelmente incorreto.
     // Tabela 2024 (Exemplo - NECESSITA VALIDAÇÃO E CÁLCULO PROGRESSIVO):
     // Até 1.412,00: 7,5%
     // De 1.412,01 a 2.666,68: 9%
     // De 2.666,69 a 4.000,03: 12%
     // De 4.000,04 a 7.786,02: 14%
     // Teto: 908.85 (para 2024)
    if (salarioBruto <= 1412.00) return salarioBruto * 0.075;
    if (salarioBruto <= 2666.68) return salarioBruto * 0.09; // Simplificado - Deveria ser progressivo
    if (salarioBruto <= 4000.03) return salarioBruto * 0.12; // Simplificado
    if (salarioBruto <= 7786.02) return salarioBruto * 0.14; // Simplificado
    return 908.85; // Teto 2024
  }

  private _calcularIRRF_BR(baseCalculo: number): number {
    // TODO: Atualizar com tabela IRRF 2024/2025!
    // Tabela 2024 (Exemplo - NECESSITA VALIDAÇÃO): 
    // Até 2.259,20: 0% (Isento)
    // De 2.259,21 a 2.826,65: 7,5% - Parcela a deduzir R$ 169,44
    // De 2.826,66 a 3.751,05: 15% - Parcela a deduzir R$ 381,44
    // De 3.751,06 a 4.664,68: 22,5% - Parcela a deduzir R$ 662,77
    // Acima de 4.664,68: 27,5% - Parcela a deduzir R$ 896,00
    // Usar a dedução simplificada de R$ 564,80 se for mais benéfica? (Não implementado)
    if (baseCalculo <= 2259.20) return 0;
    if (baseCalculo <= 2826.65) return (baseCalculo * 0.075) - 169.44;
    if (baseCalculo <= 3751.05) return (baseCalculo * 0.15) - 381.44;
    if (baseCalculo <= 4664.68) return (baseCalculo * 0.225) - 662.77;
    return (baseCalculo * 0.275) - 896.00;
  }

  // Manter métodos getFaixa por enquanto, mas idealmente viriam do cálculo
  getFaixaINSS(salarioBruto: number): string {
    // TODO: Refletir cálculo progressivo real
    if (salarioBruto <= 1412.00) return "7,5%";
    if (salarioBruto <= 2666.68) return "9%";
    if (salarioBruto <= 4000.03) return "12%";
    if (salarioBruto <= 7786.02) return "14%";
    return "Teto (14%)";
  }

  getFaixaIRRF(baseCalculo: number): string {
    if (baseCalculo <= 2259.20) return "Isento (0%)";
    if (baseCalculo <= 2826.65) return "7,5%";
    if (baseCalculo <= 3751.05) return "15%";
    if (baseCalculo <= 4664.68) return "22,5%";
    return "27,5%";
  }

  // --- Cálculo Portugal (Implementação Inicial) ---
  private _calcularPT(dados: any): Salario | null {
    const salarioBruto = dados.salarioBruto;
    const subsidioAlimentacaoDiario = dados.subsidioAlimentacao ?? 0;
    const diasTrabalhados = dados.diasTrabalhados ?? 22;
    const estadoCivil = dados.estadoCivil ?? 'solteiro';
    const numeroDependentes = dados.numeroDependentes ?? 0;
    const outrosDescontos = dados.outrosDescontos ?? 0;

    if (typeof salarioBruto !== 'number' || salarioBruto < 0) {
       console.error("Dados inválidos para cálculo PT");
       return null;
    }

    // 1. Segurança Social (SS) - 11% sobre bruto (simplificado)
    const segurancaSocial = salarioBruto * 0.11;

    // 2. Subsídio de Alimentação (Isenção)
    // TODO: Usar limites de isenção corretos para 2024/2025 (€6.00 em dinheiro, €9.60 em cartão)
    const limiteIsencaoSubAlim = 6.00; // Assumir dinheiro por simplicidade
    const subAlimTotal = subsidioAlimentacaoDiario * diasTrabalhados;
    const subAlimTributavel = Math.max(0, subsidioAlimentacaoDiario - limiteIsencaoSubAlim) * diasTrabalhados;

    // 3. Base de cálculo IRS
    // Base = Bruto + Subs. Alimentação Tributável - SS - Deduções específicas (não implementadas)
    const baseCalculoIRS = salarioBruto + subAlimTributavel - segurancaSocial;

    // 4. Cálculo IRS (Retenção na Fonte)
    // TODO: Implementar busca na tabela de retenção correta (2024/2025)!
    // As tabelas dependem de: estadoCivil, numeroDependentes, se tem deficiência, local (Continente, Açores, Madeira)
    // É complexo. Vamos retornar um valor placeholder por enquanto.
    const irs = this._calcularIRS_PT_Placeholder(baseCalculoIRS, estadoCivil, numeroDependentes);

    // 5. Salário Líquido
    const salarioLiquido = salarioBruto + subAlimTotal - segurancaSocial - irs - outrosDescontos;

    return {
      bruto: salarioBruto,
      liquido: salarioLiquido,
      descontos: {
        segurancaSocial: segurancaSocial,
        irs: irs,
        subsidioAlimentacaoTributado: subAlimTributavel,
        outrosDescontos: outrosDescontos
      },
      pais: 'PT',
      moeda: 'EUR',
      detalhesAdicionais: {
          subsidioAlimentacaoTotal: subAlimTotal,
          baseCalculoIRS: baseCalculoIRS
      }
    };
  }

  private _calcularIRS_PT_Placeholder(baseCalculoIRS: number, estadoCivil: string, dependentes: number): number {
    // Valores simplificados apenas para teste - não usar em produção!
    // As taxas reais dependem de muitos fatores e são definidas em tabelas oficiais
    let taxaBase = 0;
    
    if (baseCalculoIRS <= 7116) taxaBase = 0.115;
    else if (baseCalculoIRS <= 10736) taxaBase = 0.135;
    else if (baseCalculoIRS <= 20322) taxaBase = 0.19;
    else if (baseCalculoIRS <= 25075) taxaBase = 0.23;
    else if (baseCalculoIRS <= 36967) taxaBase = 0.275;
    else if (baseCalculoIRS <= 80882) taxaBase = 0.35;
    else taxaBase = 0.43;
    
    // Ajustes simplificados por dependentes
    let reducaoDependentes = dependentes * 0.005;
    // Ajuste por estado civil (simplificado)
    let reducaoEstadoCivil = estadoCivil === 'casado' ? 0.01 : 0;
    
    let taxaFinal = Math.max(0, taxaBase - reducaoDependentes - reducaoEstadoCivil);
    
    return baseCalculoIRS * taxaFinal;
  }

  // --- Cálculo Alemanha (Placeholder) ---
   private _calcularDE(dados: any): Salario | null {
    const salarioBruto = dados.salarioBruto;
    // ... extrair outros dados DE (steuerklasse, bundesland, etc.)

     if (typeof salarioBruto !== 'number' || salarioBruto < 0) {
       console.error("Dados inválidos para cálculo DE");
       return null;
     }

     console.warn("Cálculo para Alemanha ainda não implementado.");

     // TODO: Implementar cálculos complexos de:
     // - Lohnsteuer (imposto de renda baseado na classe fiscal)
     // - Solidaritätszuschlag (sobretaxa de solidariedade)
     // - Kirchensteuer (imposto da igreja, opcional, depende do estado)
     // - Sozialversicherung (seguro social: pensão, saúde, desemprego, cuidados - com tetos)

     // Valores placeholder:
     const lohnsteuer = salarioBruto * 0.15; // Placeholder!
     const soli = lohnsteuer * 0.0; // Quase isento agora
     const kirchensteuer = dados.kirchensteuer === 'true' ? lohnsteuer * 0.09 : 0; // Placeholder!
     const sozialversicherung = salarioBruto * 0.20; // Placeholder total!
     const outrosDescontos = dados.outrosDescontos ?? 0;

     const salarioLiquido = salarioBruto - lohnsteuer - soli - kirchensteuer - sozialversicherung - outrosDescontos;

     return {
       bruto: salarioBruto,
       liquido: salarioLiquido,
       descontos: {
         lohnsteuer: lohnsteuer,
         soli: soli,
         kirchensteuer: kirchensteuer,
         sozialversicherung: sozialversicherung,
         outrosDescontos: outrosDescontos
       },
       pais: 'DE',
       moeda: 'EUR'
     };
   }
}
