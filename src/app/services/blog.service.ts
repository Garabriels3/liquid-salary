import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artigo, Categoria } from '../models/artigo.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // Dados mockados para simular uma API
  private artigos: Artigo[] = [
    {
      id: '1',
      titulo: 'Entendendo a diferença entre salário bruto e líquido',
      slug: 'entendendo-diferenca-salario-bruto-liquido',
      resumo: 'Aprenda de forma simples a diferença entre salário bruto e líquido e como isso afeta seu planejamento financeiro mensal.',
      conteudo: `
        <h2>O que é salário bruto?</h2>
        <p>O salário bruto é o valor total que consta em seu contrato de trabalho, antes de qualquer desconto. É o montante que seu empregador se compromete a pagar pelos seus serviços.</p>
        
        <h2>O que é salário líquido?</h2>
        <p>O salário líquido é o valor que você efetivamente recebe em sua conta, após todos os descontos obrigatórios como impostos, contribuições previdenciárias e outros descontos legais.</p>
        
        <h2>Principais descontos que afetam seu salário</h2>
        <h3>1. Contribuição Previdenciária (INSS no Brasil)</h3>
        <p>O INSS é calculado com base em alíquotas progressivas que variam conforme a faixa salarial. Em 2023, as alíquotas vão de 7,5% a 14% do salário bruto, respeitando os limites de cada faixa.</p>
        
        <h3>2. Imposto de Renda (IRRF)</h3>
        <p>O Imposto de Renda Retido na Fonte também segue uma tabela progressiva, com alíquotas que podem chegar a 27,5% para os salários mais altos, após deduções.</p>
        
        <h3>3. Outros possíveis descontos</h3>
        <p>Dependendo do caso, podem existir descontos como plano de saúde, previdência privada, contribuição sindical, pensão alimentícia, entre outros.</p>
        
        <h2>Como calcular seu salário líquido</h2>
        <p>Para estimar seu salário líquido, é recomendável utilizar uma calculadora específica que aplique corretamente todas as regras fiscais e previdenciárias do seu país. Nossa calculadora de salário líquido permite fazer essa simulação de forma simples e rápida.</p>
        
        <h2>Planejamento financeiro com base no salário líquido</h2>
        <p>Ao planejar seu orçamento mensal, utilize sempre o valor líquido como referência. Muitas pessoas cometem o erro de considerar o valor bruto, o que pode comprometer o equilíbrio financeiro.</p>
        
        <h2>Conclusão</h2>
        <p>Entender a diferença entre salário bruto e líquido é essencial para um planejamento financeiro saudável. Ao ter clareza sobre os descontos que incidem sobre seu salário, você poderá tomar decisões mais informadas sobre seus gastos e investimentos.</p>
      `,
      dataPublicacao: new Date('2023-09-15'),
      autor: 'Equipe Liquid Salary',
      imagemCapa: 'assets/blog/salario-bruto-liquido.jpg',
      categorias: ['Salários', 'Finanças Pessoais'],
      tags: ['salário', 'imposto de renda', 'planejamento financeiro'],
      tempoLeitura: 5,
      visualizacoes: 1520,
      destaque: true
    },
    {
      id: '2',
      titulo: 'Como reduzir legalmente sua carga tributária sobre o salário',
      slug: 'como-reduzir-legalmente-carga-tributaria-salario',
      resumo: 'Conheça estratégias legais para otimizar sua carga tributária e aumentar seu salário líquido sem problemas com o fisco.',
      conteudo: `
        <h2>Introdução</h2>
        <p>Pagar impostos é um dever de todo cidadão, mas isso não significa que você não possa buscar formas legais de reduzir sua carga tributária. Neste artigo, vamos explorar algumas estratégias de planejamento tributário para assalariados.</p>
        
        <h2>1. Declaração completa do Imposto de Renda</h2>
        <p>Optar pela declaração completa do IR (em vez da simplificada) pode ser vantajoso caso você tenha muitas despesas dedutíveis, como:</p>
        <ul>
          <li>Despesas médicas</li>
          <li>Despesas com educação</li>
          <li>Previdência privada (PGBL)</li>
          <li>Dependentes</li>
          <li>Pensão alimentícia</li>
        </ul>
        
        <h2>2. Contribuição para previdência privada (PGBL)</h2>
        <p>A contribuição para planos de previdência do tipo PGBL pode ser deduzida da base de cálculo do Imposto de Renda em até 12% da sua renda tributável anual, reduzindo o imposto devido.</p>
        
        <h2>3. Investimentos com incentivo fiscal</h2>
        <p>Alguns investimentos oferecem incentivos fiscais. Por exemplo:</p>
        <ul>
          <li>LCI e LCA: isentos de IR para pessoa física</li>
          <li>Fundos Imobiliários: podem ter isenção de IR sobre dividendos</li>
          <li>Debêntures incentivadas: alíquota zero de IR para pessoa física</li>
        </ul>
        
        <h2>4. Benefícios não tributáveis</h2>
        <p>Ao negociar seu pacote de remuneração, dê preferência a benefícios não tributáveis, como:</p>
        <ul>
          <li>Vale-alimentação e vale-refeição</li>
          <li>Vale-transporte</li>
          <li>Plano de saúde</li>
        </ul>
        
        <h2>5. Dependentes no Imposto de Renda</h2>
        <p>Incluir todos os dependentes legais na declaração de IR, como filhos, cônjuges ou pais idosos (conforme regras específicas), ajuda a reduzir a base de cálculo do imposto.</p>
        
        <h2>Conclusão</h2>
        <p>Lembre-se de que planejamento tributário é diferente de sonegação fiscal. Todas as estratégias mencionadas são legais e reconhecidas pelas autoridades fiscais. Para segurança, consulte sempre um contador ou especialista em impostos antes de implementar qualquer estratégia.</p>
      `,
      dataPublicacao: new Date('2023-10-05'),
      autor: 'Equipe Liquid Salary',
      imagemCapa: 'assets/blog/reducao-tributaria.jpg',
      categorias: ['Impostos', 'Finanças Pessoais'],
      tags: ['imposto de renda', 'planejamento tributário', 'economia'],
      tempoLeitura: 7,
      visualizacoes: 2340,
      destaque: true
    },
    {
      id: '3',
      titulo: 'Comparativo de salários entre Brasil e Portugal: o que você precisa saber',
      slug: 'comparativo-salarios-brasil-portugal',
      resumo: 'Está pensando em se mudar para Portugal? Entenda as diferenças entre os sistemas salariais dos dois países e como isso afeta seu poder de compra.',
      conteudo: `
        <h2>Introdução</h2>
        <p>A imigração de brasileiros para Portugal tem crescido significativamente nos últimos anos. Um dos fatores determinantes nessa decisão é a comparação dos salários e custo de vida entre os dois países.</p>
        
        <h2>Diferenças nos sistemas tributários</h2>
        <p>O sistema tributário português difere do brasileiro em diversos aspectos:</p>
        
        <h3>Brasil:</h3>
        <ul>
          <li>INSS: alíquotas progressivas de 7,5% a 14%</li>
          <li>IRPF: alíquotas de 0% a 27,5%</li>
          <li>13º salário garantido por lei</li>
          <li>FGTS: depósito de 8% do salário</li>
        </ul>
        
        <h3>Portugal:</h3>
        <ul>
          <li>Segurança Social: taxa fixa de 11% para trabalhadores</li>
          <li>IRS: alíquotas progressivas de 14,5% a 48%</li>
          <li>Subsídio de férias e subsídio de Natal (equivalentes a 13º e 14º salários)</li>
        </ul>
        
        <h2>Salários médios e poder de compra</h2>
        <p>Em Portugal, o salário mínimo em 2023 é de €820, aproximadamente R$ 4.500 na cotação atual. No Brasil, o salário mínimo é de R$ 1.320.</p>
        
        <p>Para profissionais qualificados, o salário médio em Portugal varia entre €1.200 e €1.800, enquanto no Brasil, os valores podem variar significativamente dependendo da região e setor.</p>
        
        <h2>Custo de vida</h2>
        <p>O custo de vida em Portugal pode ser mais alto em alguns aspectos:</p>
        <ul>
          <li>Habitação: mais cara nas grandes cidades como Lisboa e Porto</li>
          <li>Alimentação: preços similares ou um pouco mais altos</li>
          <li>Transporte público: mais eficiente e com custo acessível</li>
          <li>Saúde: sistema público gratuito (SNS) com boa qualidade</li>
          <li>Educação: universidades públicas com mensalidades mais baixas</li>
        </ul>
        
        <h2>Benefícios sociais</h2>
        <p>Portugal oferece diversos benefícios sociais que devem ser considerados além do salário:</p>
        <ul>
          <li>Sistema de saúde universal</li>
          <li>Educação pública de qualidade</li>
          <li>Segurança pública (Portugal é um dos países mais seguros do mundo)</li>
          <li>Qualidade de vida e bem-estar social</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Ao comparar salários entre Brasil e Portugal, é fundamental considerar não apenas os valores nominais, mas também o custo de vida, benefícios sociais e qualidade de vida. Nossa calculadora de salário líquido pode ajudar a simular quanto você receberia em Portugal com base no seu salário bruto, facilitando essa comparação.</p>
      `,
      dataPublicacao: new Date('2023-11-20'),
      autor: 'Equipe Liquid Salary',
      imagemCapa: 'assets/blog/comparativo-brasil-portugal.jpg',
      categorias: ['Internacional', 'Salários'],
      tags: ['Portugal', 'imigração', 'comparativo'],
      tempoLeitura: 8,
      visualizacoes: 3100,
      destaque: false
    }
  ];

  private categorias: Categoria[] = [
    { id: '1', nome: 'Salários', slug: 'salarios', descricao: 'Artigos sobre remuneração, comparativos e análises salariais.' },
    { id: '2', nome: 'Impostos', slug: 'impostos', descricao: 'Informações sobre tributos, legislação e planejamento tributário.' },
    { id: '3', nome: 'Finanças Pessoais', slug: 'financas-pessoais', descricao: 'Dicas e estratégias para gestão das suas finanças pessoais.' },
    { id: '4', nome: 'Internacional', slug: 'internacional', descricao: 'Conteúdo sobre salários e finanças em diferentes países.' },
    { id: '5', nome: 'Carreira', slug: 'carreira', descricao: 'Orientações para desenvolvimento profissional e crescimento na carreira.' }
  ];

  constructor() { }

  // Obter todos os artigos
  getArtigos(): Observable<Artigo[]> {
    return of(this.artigos);
  }

  // Obter artigos em destaque
  getArtigosDestaque(): Observable<Artigo[]> {
    return of(this.artigos.filter(artigo => artigo.destaque));
  }

  // Obter artigo por slug
  getArtigoPorSlug(slug: string): Observable<Artigo | undefined> {
    return of(this.artigos.find(artigo => artigo.slug === slug));
  }

  // Obter categorias
  getCategorias(): Observable<Categoria[]> {
    return of(this.categorias);
  }

  // Obter artigos por categoria
  getArtigosPorCategoria(categoriaSlug: string): Observable<Artigo[]> {
    return of(this.artigos.filter(artigo => 
      artigo.categorias.some(cat => {
        const categoria = this.categorias.find(c => c.slug === categoriaSlug);
        return categoria ? cat === categoria.nome : false;
      })
    ));
  }

  // Obter artigos relacionados
  getArtigosRelacionados(artigoId: string, max: number = 3): Observable<Artigo[]> {
    const artigo = this.artigos.find(a => a.id === artigoId);
    if (!artigo) return of([]);

    // Filtra artigos que compartilham categorias ou tags
    return of(this.artigos
      .filter(a => a.id !== artigoId) // Exclui o artigo atual
      .filter(a => 
        a.categorias.some(cat => artigo.categorias.includes(cat)) || 
        a.tags.some(tag => artigo.tags.includes(tag))
      )
      .sort(() => Math.random() - 0.5) // Ordenação aleatória
      .slice(0, max) // Limita ao número máximo
    );
  }
} 