export interface ResultadoCalculo {
  bruto: number;
  liquido: number;
  descontos: {
    [key: string]: number | undefined;
  };
  pais: string;
  moeda: string;
  detalhesAdicionais?: {
    [key: string]: any;
  };
} 