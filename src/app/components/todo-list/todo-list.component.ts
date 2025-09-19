import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicoTarefa } from '../../services/todo.service';
import { ComponenteItemTarefa } from '../todo-item/todo-item.component';
import { Tarefa } from '../../models/todo.model';

@Component({
  selector: 'app-lista-tarefas',
  imports: [CommonModule, FormsModule, ComponenteItemTarefa],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class ComponenteListaTarefas {
  textoNovaTarefa = signal('');
  prioridadeNovaTarefa = signal<'baixa' | 'media' | 'alta'>('media');
  filtro = signal<'todas' | 'pendentes' | 'concluidas'>('todas');

  constructor(private servicoTarefa: ServicoTarefa) {}

  tarefas = computed(() => this.servicoTarefa.obterTarefas()());
  
  tarefasFiltradas = computed(() => {
    const todasTarefas = this.tarefas();
    const filtroAtual = this.filtro();
    
    switch (filtroAtual) {
      case 'pendentes':
        return todasTarefas.filter(tarefa => !tarefa.concluida);
      case 'concluidas':
        return todasTarefas.filter(tarefa => tarefa.concluida);
      default:
        return todasTarefas;
    }
  });

  tarefasOrdenadas = computed(() => {
    return this.tarefasFiltradas().sort((a, b) => {
      if (a.concluida !== b.concluida) {
        return a.concluida ? 1 : -1;
      }
      
      const ordemPrioridade = { alta: 3, media: 2, baixa: 1 };
      const prioridadeA = ordemPrioridade[a.prioridade || 'media'];
      const prioridadeB = ordemPrioridade[b.prioridade || 'media'];
      
      if (prioridadeA !== prioridadeB) {
        return prioridadeB - prioridadeA;
      }
      
      return b.criadaEm.getTime() - a.criadaEm.getTime();
    });
  });

  contadorTotal = computed(() => this.tarefas().length);
  contadorConcluidas = computed(() => this.tarefas().filter(tarefa => tarefa.concluida).length);
  contadorPendentes = computed(() => this.tarefas().filter(tarefa => !tarefa.concluida).length);

  adicionarTarefa(): void {
    const texto = this.textoNovaTarefa().trim();
    if (texto) {
      this.servicoTarefa.adicionarTarefa(texto, this.prioridadeNovaTarefa());
      this.textoNovaTarefa.set('');
      this.prioridadeNovaTarefa.set('media');
    }
  }

  aoAlternarTarefa(id: number): void {
    this.servicoTarefa.alternarTarefa(id);
  }

  aoExcluirTarefa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.servicoTarefa.excluirTarefa(id);
    }
  }

  aoAtualizarTarefa(evento: {id: number, texto: string}): void {
    this.servicoTarefa.atualizarTarefa(evento.id, evento.texto);
  }

  aoAtualizarPrioridadeTarefa(evento: {id: number, prioridade: 'baixa' | 'media' | 'alta'}): void {
    this.servicoTarefa.atualizarPrioridadeTarefa(evento.id, evento.prioridade);
  }

  definirFiltro(filtro: 'todas' | 'pendentes' | 'concluidas'): void {
    this.filtro.set(filtro);
  }

  aoTeclarEnter(evento: KeyboardEvent): void {
    if (evento.key === 'Enter') {
      this.adicionarTarefa();
    }
  }

  obterClasseFiltro(tipoFiltro: 'todas' | 'pendentes' | 'concluidas'): string {
    return this.filtro() === tipoFiltro ? 'ativo' : '';
  }

  rastrearPorIdTarefa(indice: number, tarefa: Tarefa): number {
    return tarefa.id;
  }

  obterTituloEstadoVazio(): string {
    switch (this.filtro()) {
      case 'pendentes':
        return 'Nenhuma tarefa pendente!';
      case 'concluidas':
        return 'Nenhuma tarefa concluída!';
      default:
        return 'Nenhuma tarefa encontrada!';
    }
  }

  obterMensagemEstadoVazio(): string {
    switch (this.filtro()) {
      case 'pendentes':
        return 'Todas as suas tarefas foram concluídas. Parabéns!';
      case 'concluidas':
        return 'Você ainda não concluiu nenhuma tarefa.';
      default:
        return 'Comece adicionando uma nova tarefa acima.';
    }
  }
}