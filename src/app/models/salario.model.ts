export interface Salario {
  bruto: number;
  liquido: number;
  descontos: {
    [key: string]: number | undefined;
    inss?: number;
    irrf?: number;
    segurancaSocial?: number;
    irs?: number;
    lohnsteuer?: number;
    soli?: number;
    kirchensteuer?: number;
    sozialversicherung?: number;
    subsidioAlimentacaoTributado?: number;
    outrosDescontos?: number;
  };
  beneficios?: {
    valeRefeicao?: number;
    valeTransporte?: number;
    outrosBeneficios?: number;
  };
  pais?: string;
  moeda?: string;
  taxaEfetivaTotal?: number;
  detalhesAdicionais?: { [key: string]: any };
}

export interface Descontos {
  [key: string]: number | undefined;
}
