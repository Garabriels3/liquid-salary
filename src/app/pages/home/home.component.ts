import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';
import { AdBannerComponent } from '../../components/ad-banner.component';
import { CalculadoraFormComponent } from '../../components/calculadora-form/calculadora-form.component';
import { Salario } from '../../models/salario.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AdBannerComponent,
    RouterModule,
    CalculadoraFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  paisSelecionado: string = 'BR';
  currentYear: number = new Date().getFullYear();
  resultado: Salario | null = null;
  artigosDestaque: Artigo[] = [];
  
  faqs: { pergunta: string; resposta: string; aberto: boolean }[] = [
    {
      pergunta: 'O que é salário líquido?',
      resposta: 'O salário líquido é o valor que o trabalhador efetivamente recebe após todas as deduções obrigatórias, como INSS, IRRF e outros descontos. É o valor "real" que vai para a conta bancária do trabalhador.',
      aberto: false
    },
    {
      pergunta: 'Como calcular o INSS corretamente?',
      resposta: 'O INSS é calculado de forma progressiva, por faixas de salário. Em 2023, existem quatro faixas de contribuição, com alíquotas que variam de 7,5% a 14%. O valor de contribuição é calculado aplicando o percentual correspondente a cada faixa do salário. Nossa calculadora faz esse cálculo automaticamente conforme as regras atualizadas.',
      aberto: false
    },
    {
      pergunta: 'Quais são os descontos obrigatórios no salário?',
      resposta: 'Os descontos obrigatórios no salário incluem o INSS (Previdência Social) e o IRRF (Imposto de Renda Retido na Fonte). Dependendo da empresa e da categoria profissional, podem existir outros descontos como contribuição sindical, assistência médica, vale-transporte, entre outros.',
      aberto: false
    },
    {
      pergunta: 'Vale-transporte e vale-refeição são descontos obrigatórios?',
      resposta: 'O vale-transporte pode gerar um desconto de até 6% do salário bruto, caso o trabalhador opte por recebê-lo. Já o vale-refeição geralmente não gera descontos, sendo um benefício oferecido pela empresa, mas isso pode variar conforme a política de cada organização.',
      aberto: false
    },
    {
      pergunta: 'Como funciona o cálculo do Imposto de Renda (IRRF)?',
      resposta: 'O IRRF é calculado aplicando a alíquota correspondente à faixa salarial (após o desconto do INSS) e subtraindo a dedução específica daquela faixa. Também são consideradas deduções por dependentes (R$ 189,59 por dependente em 2023), pensão alimentícia e outras deduções legais.',
      aberto: false
    },
    {
      pergunta: 'O que é a Reforma Tributária e como afeta meu salário?',
      resposta: 'A Reforma Tributária é um conjunto de mudanças nas leis fiscais que visa simplificar o sistema tributário brasileiro. Dependendo das alterações aprovadas, pode haver impactos na forma como os impostos são calculados sobre o salário. É importante se manter atualizado sobre as mudanças para entender como seu salário pode ser afetado.',
      aberto: false
    }
  ];
  
  dataAtualizacao: string = '10 de novembro de 2023';
  autorArtigo: string = 'Equipe Liquid Salary';

  constructor(
    private analytics: AngularFireAnalytics,
    private titleService: Title,
    private metaService: Meta,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.atualizarMetaTagsPorPais();
    this.analytics.logEvent('page_view', { page_name: 'home', pais_inicial: this.paisSelecionado });
    this.carregarArtigosDestaque();
  }

  atualizarMetaTagsPorPais(): void {
    let title = '';
    let description = '';
    let keywords = '';

    switch (this.paisSelecionado) {
      case 'BR':
        title = `Calculadora Salário Líquido Brasil ${this.currentYear} | INSS, IRRF`;
        description = `Calcule seu salário líquido no Brasil (${this.currentYear}). Simule descontos de INSS, IRRF e veja o valor final. Ferramenta atualizada.`;
        keywords = `calculadora salario liquido, brasil, ${this.currentYear}, clt, inss, irrf, desconto salario`;
        break;
      case 'PT':
        title = `Calculadora Salário Líquido Portugal ${this.currentYear} | IRS, SS`;
        description = `Calcule o seu salário líquido em Portugal (${this.currentYear}). Simulador considera IRS e Segurança Social. Atualizado.`;
        keywords = `calculadora salario liquido, portugal, ${this.currentYear}, irs, segurança social, ss, ordenado liquido`;
        break;
      default:
        title = `Calculadora Salário Líquido Online | ${this.paisSelecionado}`;
        description = `Calcule seu salário líquido online para ${this.paisSelecionado}.`;
        keywords = `calculadora salario liquido, ${this.paisSelecionado}`;
    }

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: window.location.href });

    this.analytics.logEvent('meta_tags_atualizadas', { pais: this.paisSelecionado });
  }
  
  onResultadoCalculado(evento: {resultado: any, pais: string}): void {
    this.resultado = evento.resultado;
    this.paisSelecionado = evento.pais.toUpperCase();
    this.atualizarMetaTagsPorPais();
    
    // Log para analytics
    const eventoAnalytics = {
      moeda: evento.resultado.moeda,
      salario_bruto: evento.resultado.bruto,
      salario_liquido: evento.resultado.liquido,
      pais: this.paisSelecionado
    };
    
    this.analytics.logEvent('calculo_realizado', eventoAnalytics);
  }

  carregarArtigosDestaque(): void {
    this.blogService.getArtigosDestaque().subscribe(artigos => {
      this.artigosDestaque = artigos;
    });
  }

  formatarData(data: Date): string {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear()}`;
  }

  toggleFaq(index: number): void {
    this.faqs[index].aberto = !this.faqs[index].aberto;
  }
}
