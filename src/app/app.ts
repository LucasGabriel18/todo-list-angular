import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteListaTarefas } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ComponenteListaTarefas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lista-tarefas-dev');
}
