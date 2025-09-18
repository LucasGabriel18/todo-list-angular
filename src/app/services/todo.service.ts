import { Injectable, signal } from '@angular/core';
import { Tarefa, TarefaModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoTarefa {
  private proximoId = 1;
  private tarefas = signal<Tarefa[]>([]);

  constructor() {
    this.carregarDoArmazenamentoLocal();
  }

  obterTarefas() {
    return this.tarefas.asReadonly();
  }

  obterTarefaPorId(id: number): Tarefa | undefined {
    return this.tarefas().find(tarefa => tarefa.id === id);
  }

  obterTarefasConcluidas(): Tarefa[] {
    return this.tarefas().filter(tarefa => tarefa.concluida);
  }

  obterTarefasPendentes(): Tarefa[] {
    return this.tarefas().filter(tarefa => !tarefa.concluida);
  }

  obterTarefasPorPrioridade(prioridade: 'baixa' | 'media' | 'alta'): Tarefa[] {
    return this.tarefas().filter(tarefa => tarefa.prioridade === prioridade);
  }

  adicionarTarefa(texto: string, prioridade: 'baixa' | 'media' | 'alta' = 'media'): void {
    if (texto.trim()) {
      const novaTarefa = new TarefaModel(this.proximoId++, texto.trim(), false, prioridade);
      this.tarefas.update(tarefas => [...tarefas, novaTarefa]);
      this.salvarNoArmazenamentoLocal();
    }
  }

  atualizarTarefa(id: number, novoTexto: string): void {
    this.tarefas.update(tarefas => 
      tarefas.map(tarefa => {
        if (tarefa.id === id) {
          const tarefaAtualizada = { ...tarefa };
          tarefaAtualizada.texto = novoTexto.trim();
          tarefaAtualizada.atualizadaEm = new Date();
          return tarefaAtualizada;
        }
        return tarefa;
      })
    );
    this.salvarNoArmazenamentoLocal();
  }

  alternarTarefa(id: number): void {
    this.tarefas.update(tarefas => 
      tarefas.map(tarefa => {
        if (tarefa.id === id) {
          const tarefaAtualizada = { ...tarefa };
          tarefaAtualizada.concluida = !tarefaAtualizada.concluida;
          tarefaAtualizada.atualizadaEm = new Date();
          return tarefaAtualizada;
        }
        return tarefa;
      })
    );
    this.salvarNoArmazenamentoLocal();
  }

  excluirTarefa(id: number): void {
    this.tarefas.update(tarefas => tarefas.filter(tarefa => tarefa.id !== id));
    this.salvarNoArmazenamentoLocal();
  }

  atualizarPrioridadeTarefa(id: number, prioridade: 'baixa' | 'media' | 'alta'): void {
    this.tarefas.update(tarefas => 
      tarefas.map(tarefa => {
        if (tarefa.id === id) {
          const tarefaAtualizada = { ...tarefa };
          tarefaAtualizada.prioridade = prioridade;
          tarefaAtualizada.atualizadaEm = new Date();
          return tarefaAtualizada;
        }
        return tarefa;
      })
    );
    this.salvarNoArmazenamentoLocal();
  }

  marcarTodasComoConcluidas(): void {
    this.tarefas.update(tarefas => 
      tarefas.map(tarefa => ({
        ...tarefa,
        concluida: true,
        atualizadaEm: new Date()
      }))
    );
    this.salvarNoArmazenamentoLocal();
  }

  excluirTodasConcluidas(): void {
    this.tarefas.update(tarefas => tarefas.filter(tarefa => !tarefa.concluida));
    this.salvarNoArmazenamentoLocal();
  }

  limparTodasTarefas(): void {
    this.tarefas.set([]);
    this.salvarNoArmazenamentoLocal();
  }

  obterContadorTotal(): number {
    return this.tarefas().length;
  }

  obterContadorConcluidas(): number {
    return this.obterTarefasConcluidas().length;
  }

  obterContadorPendentes(): number {
    return this.obterTarefasPendentes().length;
  }

  private salvarNoArmazenamentoLocal(): void {
    try {
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas()));
      localStorage.setItem('proximoId', this.proximoId.toString());
    } catch (erro) {
      console.error('Erro ao salvar no armazenamento local:', erro);
    }
  }

  private carregarDoArmazenamentoLocal(): void {
    try {
      const tarefasSalvas = localStorage.getItem('tarefas');
      const proximoIdSalvo = localStorage.getItem('proximoId');
      
      if (tarefasSalvas) {
        const tarefasAnalisadas = JSON.parse(tarefasSalvas);

        const tarefasComDatas = tarefasAnalisadas.map((tarefa: any) => ({
          ...tarefa,
          criadaEm: new Date(tarefa.criadaEm),
          atualizadaEm: new Date(tarefa.atualizadaEm)
        }));
        this.tarefas.set(tarefasComDatas);
      }
      
      if (proximoIdSalvo) {
        this.proximoId = parseInt(proximoIdSalvo, 10);
      }
    } catch (erro) {
      console.error('Erro ao carregar do armazenamento local:', erro);
      this.tarefas.set([]);
      this.proximoId = 1;
    }
  }
}