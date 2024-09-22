export interface Salario {
  bruto: number;
  liquido: number;
  descontos: {
    inss: number;
    irrf: number;
    outrosDescontos: number;
  };
}
