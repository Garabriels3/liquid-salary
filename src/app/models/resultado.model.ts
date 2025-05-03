export interface Resultado {
  bruto: number;
  liquido: number;
  descontos: {
    [key: string]: number | undefined;
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