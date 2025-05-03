import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalculoSalarioService } from './calculo-salario.service';
import { Resultado } from '../models/resultado.model';

@Injectable({
  providedIn: 'root'
})
export class SalarioService {
  constructor(private calculoSalarioService: CalculoSalarioService) {}

  calcularSalario(dadosFormulario: any): Observable<Resultado> {
    const pais = dadosFormulario.pais.toUpperCase();
    const resultado = this.calculoSalarioService.calcular(pais, dadosFormulario);
    
    if (resultado) {
      return of(resultado as Resultado);
    } else {
      throw new Error(`Erro ao calcular salário para ${pais}`);
    }
  }
} 