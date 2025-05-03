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
      destaque: true
    },
    {
      id: '4',
      titulo: 'Tabela do INSS 2024: Entenda as novas faixas e alíquotas',
      slug: 'tabela-inss-2024-novas-faixas-aliquotas',
      resumo: 'Confira as atualizações na tabela do INSS para 2024, com as novas faixas salariais e alíquotas de contribuição que afetam seu salário líquido.',
      conteudo: `
        <h2>Introdução</h2>
        <p>Com o início de 2024, entraram em vigor novas regras para o cálculo da contribuição do INSS (Instituto Nacional do Seguro Social). Estas atualizações impactam diretamente o valor do seu salário líquido e, por isso, é importante entender como funcionam.</p>
        
        <h2>Tabela do INSS 2024 - Novas faixas</h2>
        <p>A tabela do INSS para 2024 mantém o sistema progressivo implementado em 2020, com faixas que incidem apenas sobre a parcela do salário que se enquadra em cada uma. Confira:</p>
        
        <table>
          <thead>
            <tr>
              <th>Faixa Salarial</th>
              <th>Alíquota</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Até R$ 1.412,00</td>
              <td>7,5%</td>
            </tr>
            <tr>
              <td>De R$ 1.412,01 até R$ 2.666,68</td>
              <td>9%</td>
            </tr>
            <tr>
              <td>De R$ 2.666,69 até R$ 4.000,03</td>
              <td>12%</td>
            </tr>
            <tr>
              <td>De R$ 4.000,04 até R$ 7.786,02</td>
              <td>14%</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Como funciona o cálculo progressivo</h2>
        <p>Diferente do que muitos pensam, a alíquota não incide sobre o valor total do salário, mas sim de forma progressiva. Isso significa que:</p>
        <ul>
          <li>Sobre a parte do salário até R$ 1.412,00: aplica-se 7,5%</li>
          <li>Sobre a parte entre R$ 1.412,01 e R$ 2.666,68: aplica-se 9%</li>
          <li>Sobre a parte entre R$ 2.666,69 e R$ 4.000,03: aplica-se 12%</li>
          <li>Sobre a parte entre R$ 4.000,04 e R$ 7.786,02: aplica-se 14%</li>
        </ul>
        
        <h2>Exemplo prático de cálculo</h2>
        <p>Para um salário de R$ 5.000,00, o cálculo seria:</p>
        <ul>
          <li>Faixa 1: R$ 1.412,00 x 7,5% = R$ 105,90</li>
          <li>Faixa 2: (R$ 2.666,68 - R$ 1.412,01) x 9% = R$ 112,92</li>
          <li>Faixa 3: (R$ 4.000,03 - R$ 2.666,69) x 12% = R$ 160,00</li>
          <li>Faixa 4: (R$ 5.000,00 - R$ 4.000,04) x 14% = R$ 140,00</li>
          <li>Total de contribuição: R$ 518,82</li>
        </ul>
        
        <h2>Teto do INSS</h2>
        <p>O teto de contribuição para 2024 foi fixado em R$ 7.786,02. Isso significa que, independentemente de quanto você ganhe acima desse valor, sua contribuição máxima será calculada sobre esse limite.</p>
        
        <h2>Impacto no salário líquido</h2>
        <p>Com as mudanças na tabela, trabalhadores com salários mais altos tendem a contribuir com valores um pouco maiores. Para calcular o impacto exato no seu salário líquido, utilize nossa calculadora, que já está atualizada com os valores de 2024.</p>
        
        <h2>Conclusão</h2>
        <p>Entender as faixas e alíquotas do INSS é fundamental para compreender seu contracheque e fazer um planejamento financeiro adequado. Nossa calculadora de salário líquido está sempre atualizada com as regras mais recentes, facilitando sua vida na hora de fazer esses cálculos.</p>
      `,
      dataPublicacao: new Date('2024-01-12'),
      autor: 'Equipe Liquid Salary',
      imagemCapa: 'assets/blog/tabela-inss.jpg',
      categorias: ['Impostos', 'Salários'],
      tags: ['INSS', 'contribuição previdenciária', 'salário líquido', '2024'],
      tempoLeitura: 6,
      visualizacoes: 4280,
      destaque: true
    },
    {
      id: '5',
      titulo: 'Vale-refeição e Vale-alimentação: impactos no salário e nas finanças pessoais',
      slug: 'vale-refeicao-vale-alimentacao-impactos-salario',
      resumo: 'Descubra como o VA e VR afetam seu salário líquido, as vantagens tributárias e como utilizá-los de forma estratégica em seu planejamento financeiro.',
      conteudo: `
        <h2>Introdução</h2>
        <p>O vale-refeição (VR) e o vale-alimentação (VA) são benefícios muito comuns oferecidos por empresas brasileiras. Além de representarem uma economia direta no orçamento, eles possuem vantagens tributárias tanto para empregadores quanto para funcionários.</p>
        
        <h2>Diferença entre Vale-Refeição e Vale-Alimentação</h2>
        <p>Embora muitas pessoas confundam, existe uma diferença importante entre os dois benefícios:</p>
        <ul>
          <li><strong>Vale-Refeição (VR):</strong> destinado a refeições prontas, em restaurantes, lanchonetes e estabelecimentos similares durante o horário de trabalho.</li>
          <li><strong>Vale-Alimentação (VA):</strong> para compra de alimentos in natura em supermercados, mercearias, etc., visando a alimentação familiar em casa.</li>
        </ul>
        
        <h2>Vantagens tributárias</h2>
        <p>Uma das grandes vantagens destes benefícios é que eles não são considerados como parte do salário para fins tributários, desde que a empresa esteja inscrita no Programa de Alimentação do Trabalhador (PAT). Isso significa que:</p>
        <ul>
          <li>Não incidem encargos trabalhistas como INSS e FGTS</li>
          <li>Não são base de cálculo para o Imposto de Renda</li>
          <li>A empresa pode deduzir parte do valor como despesa operacional</li>
        </ul>
        
        <h2>Impacto no salário líquido</h2>
        <p>Quando uma empresa oferece VA e VR, ela está efetivamente aumentando o poder de compra do funcionário sem os descontos que incidiriam se o mesmo valor fosse incorporado ao salário. Por exemplo:</p>
        
        <p>Imagine um trabalhador com salário bruto de R$ 5.000,00 que recebe R$ 600,00 de vale-alimentação e R$ 800,00 de vale-refeição:</p>
        <ul>
          <li>Se esses R$ 1.400,00 fossem parte do salário, haveria incidência de aproximadamente 27,5% de IR e 11% de INSS, reduzindo o valor líquido para cerca de R$ 860,00.</li>
          <li>Como benefício, o valor total de R$ 1.400,00 é mantido integralmente.</li>
        </ul>
        
        <h2>Estratégias de uso</h2>
        <p>Para maximizar esses benefícios em suas finanças pessoais:</p>
        <ol>
          <li><strong>Planejamento de compras:</strong> utilize o VA para compras mensais maiores, aproveitando promoções.</li>
          <li><strong>Economia direcionada:</strong> ao economizar com alimentação, direcione o valor equivalente para investimentos.</li>
          <li><strong>Negociação salarial:</strong> ao negociar sua remuneração, considere o pacote completo incluindo os benefícios.</li>
        </ol>
        
        <h2>Mudanças recentes na legislação</h2>
        <p>A partir de 2023, com a Lei 14.442/2022, foram introduzidas algumas mudanças importantes:</p>
        <ul>
          <li>Flexibilização do uso: possibilidade de portabilidade de valores entre VA e VR</li>
          <li>Proibição de taxas negativas: empresas não podem mais receber descontos ou incentivos para contratar determinada fornecedora de vale</li>
          <li>Saldos não utilizados podem ser acumulados sem prazo para expirar</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Vale-refeição e vale-alimentação são benefícios valiosos que aumentam o poder de compra real do trabalhador, sem os descontos que incidiriam sobre aumentos salariais equivalentes. Ao calcular seu salário líquido real, certifique-se de considerar o valor destes benefícios para ter uma visão completa da sua remuneração.</p>
      `,
      dataPublicacao: new Date('2023-12-08'),
      autor: 'Equipe Liquid Salary',
      imagemCapa: 'assets/blog/vale-refeicao-alimentacao.jpg',
      categorias: ['Salários', 'Finanças Pessoais'],
      tags: ['benefícios', 'vale-refeição', 'vale-alimentação', 'tributação'],
      tempoLeitura: 7,
      visualizacoes: 2850,
      destaque: true
    },
    {
      id: '6',
      titulo: 'Salário em Alemanha: Como funciona a tributação e os descontos',
      slug: 'salario-alemanha-tributacao-descontos',
      resumo: 'Guia completo sobre o sistema salarial alemão, incluindo impostos, contribuições sociais e como calcular seu salário líquido.',
      conteudo: `
        <h2>Introdução ao sistema salarial alemão</h2>
        <p>A Alemanha possui um dos sistemas tributários mais complexos da Europa, mas também oferece excelentes benefícios sociais em contrapartida. Se você está considerando trabalhar na Alemanha ou já trabalha lá, é importante entender como funciona a estrutura salarial e quais descontos incidem sobre seu salário bruto.</p>
        
        <h2>Salários médios na Alemanha</h2>
        <p>O salário médio na Alemanha em 2024 está em torno de €4.100 brutos mensais, variando significativamente conforme a região, setor e qualificação. As regiões do sul, como Baviera e Baden-Württemberg, tendem a oferecer salários mais altos, enquanto as regiões do leste ainda apresentam médias salariais menores.</p>
        
        <h2>Principais descontos no salário alemão</h2>
        
        <h3>1. Lohnsteuer (Imposto de Renda)</h3>
        <p>O imposto de renda alemão é progressivo, com alíquotas que variam de 14% a 45%, dependendo da faixa salarial. Existem diferentes classes fiscais (Steuerklasse) que determinam como você será tributado:</p>
        <ul>
          <li><strong>Classe I:</strong> para solteiros sem filhos</li>
          <li><strong>Classe II:</strong> para pais/mães solteiros</li>
          <li><strong>Classe III e V:</strong> para casais onde um cônjuge ganha significativamente mais</li>
          <li><strong>Classe IV:</strong> para casais com rendimentos similares</li>
          <li><strong>Classe VI:</strong> para segundo emprego</li>
        </ul>
        
        <h3>2. Sozialversicherung (Seguridade Social)</h3>
        <p>Inclui quatro contribuições principais:</p>
        <ul>
          <li><strong>Rentenversicherung (Previdência):</strong> 18,6% do salário bruto, dividido igualmente entre empregador e empregado</li>
          <li><strong>Krankenversicherung (Seguro Saúde):</strong> aproximadamente 14,6% + taxa adicional de 1,1% em média, também dividido</li>
          <li><strong>Arbeitslosenversicherung (Seguro Desemprego):</strong> 2,6%, dividido igualmente</li>
          <li><strong>Pflegeversicherung (Seguro para Cuidados de Longo Prazo):</strong> 3,4% para pessoas com filhos e 4,0% para quem não tem filhos</li>
        </ul>
        
        <h3>3. Solidaritätszuschlag (Taxa de Solidariedade)</h3>
        <p>Um imposto adicional de 5,5% sobre o imposto de renda, criado para financiar a reconstrução do leste alemão. Desde 2021, foi eliminado para baixos e médios rendimentos.</p>
        
        <h3>4. Kirchensteuer (Imposto da Igreja)</h3>
        <p>Se você for filiado a uma igreja oficialmente reconhecida (católica ou protestante), pagará entre 8% e 9% do imposto de renda como imposto da igreja. Esse imposto é opcional, pois você pode optar por sair formalmente da igreja.</p>
        
        <h2>Exemplo de cálculo</h2>
        <p>Para um salário bruto de €4.000/mês na classe fiscal I (solteiro sem filhos):</p>
        <ul>
          <li>Lohnsteuer (Imposto de Renda): aproximadamente €670</li>
          <li>Rentenversicherung (Previdência): €372 (9,3%)</li>
          <li>Krankenversicherung (Seguro de Saúde): aproximadamente €320 (7,5% + adicional)</li>
          <li>Arbeitslosenversicherung (Seguro Desemprego): €52 (1,3%)</li>
          <li>Pflegeversicherung (Seguro de Cuidados): €68 (1,7% para quem não tem filhos)</li>
          <li>Kirchensteuer (opcional): aproximadamente €60 (9% do imposto de renda)</li>
        </ul>
        <p>Salário líquido aproximado: €2.458</p>
        
        <h2>Benefícios do sistema alemão</h2>
        <p>Apesar dos altos descontos, o sistema alemão oferece excelentes contrapartidas:</p>
        <ul>
          <li>Sistema de saúde de alta qualidade</li>
          <li>Aposentadoria garantida</li>
          <li>Seguro-desemprego robusto</li>
          <li>Auxílio-família generoso (Kindergeld)</li>
          <li>Licença parental extensa e parcialmente remunerada</li>
        </ul>
        
        <h2>Simulando seu salário líquido</h2>
        <p>Nossa calculadora de salário para a Alemanha já incorpora todas essas variáveis, facilitando a simulação do seu salário líquido. Basta inserir seu salário bruto, classe fiscal e outras informações relevantes para obter uma estimativa precisa de quanto você receberá de fato.</p>
        
        <h2>Conclusão</h2>
        <p>Embora os descontos no salário alemão possam parecer altos à primeira vista, o sistema oferece uma rede de proteção social abrangente que proporciona qualidade de vida e segurança aos trabalhadores. Compreender como funciona essa estrutura é essencial para planejar suas finanças pessoais e avaliar propostas de trabalho no país.</p>
      `,
      dataPublicacao: new Date('2024-02-15'),
      autor: 'Equipe Liquid Salary',
      imagemCapa: 'assets/blog/salario-alemanha.jpg',
      categorias: ['Internacional', 'Impostos'],
      tags: ['Alemanha', 'tributação internacional', 'impostos', 'expatriados'],
      tempoLeitura: 9,
      visualizacoes: 3120,
      destaque: true
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