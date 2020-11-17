export class Qualis {

  titulo: string
  ano: number
  tipo: string
  issn: string
  avaliacao: string

  constructor(titulo: string, ano: number, tipo: string, issn: string, avaliacao: string) {
    this.titulo = titulo
    this.ano = ano
    this.tipo = tipo
    this.issn = issn
    this.avaliacao = avaliacao
  }

  clone(): Qualis {
    let copy: Qualis = new Qualis(this.titulo, this.ano, this.tipo, this.issn, this.avaliacao);
    return copy;
  }

  copyFrom(q: Qualis): Qualis {
    this.titulo = q.titulo;
    this.ano = q.ano;
    this.tipo = q.tipo;
    this.issn = q.issn;
    this.avaliacao = q.avaliacao;
    return this;
  }
  
}