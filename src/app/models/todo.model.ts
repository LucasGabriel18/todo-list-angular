export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
  criadaEm: Date;
  atualizadaEm: Date;
  prioridade?: 'baixa' | 'media' | 'alta';
}

export class TarefaModel implements Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
  criadaEm: Date;
  atualizadaEm: Date;
  prioridade?: 'baixa' | 'media' | 'alta';

  constructor(
    id: number,
    texto: string,
    concluida: boolean = false,
    prioridade: 'baixa' | 'media' | 'alta' = 'media'
  ) {
    this.id = id;
    this.texto = texto;
    this.concluida = concluida;
    this.prioridade = prioridade;
    this.criadaEm = new Date();
    this.atualizadaEm = new Date();
  }

  alternarConclusao(): void {
    this.concluida = !this.concluida;
    this.atualizadaEm = new Date();
  }

  atualizarTexto(novoTexto: string): void {
    this.texto = novoTexto;
    this.atualizadaEm = new Date();
  }

  definirPrioridade(prioridade: 'baixa' | 'media' | 'alta'): void {
    this.prioridade = prioridade;
    this.atualizadaEm = new Date();
  }
}