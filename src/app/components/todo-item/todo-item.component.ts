import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/todo.model';

@Component({
  selector: 'app-item-tarefa',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class ComponenteItemTarefa {
  @Input() tarefa!: Tarefa;
  @Output() alternar = new EventEmitter<number>();
  @Output() excluir = new EventEmitter<number>();
  @Output() atualizar = new EventEmitter<{id: number, texto: string}>();
  @Output() atualizarPrioridade = new EventEmitter<{id: number, prioridade: 'baixa' | 'media' | 'alta'}>();

  estaEditando = signal(false);
  textoEdicao = signal('');

  aoAlternar(): void {
    this.alternar.emit(this.tarefa.id);
  }

  aoExcluir(): void {
    this.excluir.emit(this.tarefa.id);
  }

  iniciarEdicao(): void {
    this.textoEdicao.set(this.tarefa.texto);
    this.estaEditando.set(true);
  }

  cancelarEdicao(): void {
    this.estaEditando.set(false);
    this.textoEdicao.set('');
  }

  salvarEdicao(): void {
    if (this.textoEdicao().trim()) {
      this.atualizar.emit({
        id: this.tarefa.id,
        texto: this.textoEdicao().trim()
      });
      this.estaEditando.set(false);
    }
  }

  aoTeclarEnter(evento: KeyboardEvent): void {
    if (evento.key === 'Enter') {
      this.salvarEdicao();
    } else if (evento.key === 'Escape') {
      this.cancelarEdicao();
    }
  }

  aoMudarPrioridade(prioridade: 'baixa' | 'media' | 'alta'): void {
    this.atualizarPrioridade.emit({
      id: this.tarefa.id,
      prioridade
    });
  }

  obterClassePrioridade(): string {
    return `prioridade-${this.tarefa.prioridade || 'media'}`;
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  }
}