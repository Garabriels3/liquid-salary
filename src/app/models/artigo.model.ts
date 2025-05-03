export interface Artigo {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  dataPublicacao: Date;
  autor: string;
  imagemCapa?: string;
  categorias: string[];
  tags: string[];
  tempoLeitura?: number; // em minutos
  visualizacoes?: number;
  destaque?: boolean;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
}

export interface ArtigoDestaque {
  artigo: Artigo;
  posicao: 'principal' | 'secundario';
} 