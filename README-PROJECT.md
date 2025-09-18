# TodoList - Projeto de Aprendizado Angular

Um projeto completo de TodoList desenvolvido em Angular 18 com TypeScript, demonstrando boas práticas de desenvolvimento e organização de código.

## 🚀 Funcionalidades

### ✅ Funcionalidades Principais
- **Adicionar tarefas** com diferentes níveis de prioridade (Baixa, Média, Alta)
- **Marcar tarefas como concluídas** com checkbox interativo
- **Editar tarefas** inline com modo de edição
- **Excluir tarefas** com confirmação
- **Filtrar tarefas** por status (Todas, Pendentes, Concluídas)
- **Alterar prioridade** das tarefas dinamicamente

### 📊 Recursos Avançados
- **Estatísticas em tempo real** (Total, Pendentes, Concluídas)
- **Barra de progresso** visual do completamento
- **Persistência de dados** no LocalStorage
- **Ordenação inteligente** por status e prioridade
- **Ações em lote** (Marcar todas, Excluir concluídas, Limpar tudo)
- **Interface responsiva** para mobile e desktop

### 🎨 Design e UX
- **CSS moderno** com gradientes e animações
- **Feedback visual** com hover effects e transições
- **Checkbox personalizado** com animação
- **Estados vazios** informativos
- **Indicadores visuais** por prioridade
- **Interface limpa e intuitiva**

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Pastas
```
src/app/
├── components/
│   ├── todo-list/          # Componente principal da lista
│   └── todo-item/          # Componente de item individual
├── models/
│   └── todo.model.ts       # Interface e classe Todo
├── services/
│   └── todo.service.ts     # Serviço de gerenciamento
├── app.ts                  # Componente raiz
├── app.html               # Template principal
└── app.css                # Estilos globais
```

### 🔧 Tecnologias Utilizadas
- **Angular 18** com Standalone Components
- **TypeScript** para tipagem estática
- **Angular Signals** para reatividade
- **CSS3** com Flexbox e Grid
- **LocalStorage API** para persistência
- **Angular Forms** para formulários

### 📦 Componentes

#### TodoListComponent
- Gerencia a lista completa de tarefas
- Controla filtros e estatísticas
- Implementa ações em lote
- Renderiza estado vazio

#### TodoItemComponent
- Representa uma tarefa individual
- Modo de edição inline
- Ações por item (editar, excluir, prioridade)
- Estados visuais por status

#### TodoService
- Gerenciamento centralizado de estado
- Operações CRUD completas
- Persistência automática
- Métodos de consulta e estatísticas

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI

### Instalação e Execução
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

### URLs
- **Desenvolvimento**: http://localhost:4200
- **Build**: Pasta `dist/`

## 💡 Recursos de Aprendizado

### Conceitos Angular Demonstrados
1. **Standalone Components** - Componentes independentes sem módulos
2. **Angular Signals** - Sistema reativo moderno
3. **Dependency Injection** - Injeção de dependências
4. **Event Binding** - Comunicação entre componentes
5. **Template Driven Forms** - Formulários com ngModel
6. **Computed Values** - Valores calculados automaticamente
7. **Component Communication** - @Input e @Output

### Boas Práticas Implementadas
1. **Separação de Responsabilidades** - Services, Models, Components
2. **Tipagem TypeScript** - Interfaces e tipos customizados
3. **Reatividade** - Uso de Signals e Computed
4. **Persistência** - LocalStorage com error handling
5. **UX Design** - Estados de loading, empty states, confirmações
6. **Responsividade** - Mobile-first design
7. **Organização** - Estrutura de pastas clara

### CSS Moderno Utilizado
1. **Flexbox e Grid** - Layout responsivo
2. **Custom Properties** - Variáveis CSS
3. **Animations** - Transições suaves
4. **Pseudo-elements** - Elementos customizados
5. **Media Queries** - Responsividade
6. **Box Shadow** - Elevação e profundidade
7. **Border Radius** - Elementos arredondados

## 📱 Responsividade

- **Desktop** (1024px+): Layout em grid com sidebar
- **Tablet** (768px-1024px): Layout adaptativo
- **Mobile** (até 768px): Layout empilhado

## 🔮 Funcionalidades Futuras

### Possíveis Melhorias
- [ ] Categorias de tarefas
- [ ] Data de vencimento
- [ ] Notificações
- [ ] Busca e filtros avançados
- [ ] Drag & Drop para reordenação
- [ ] Temas personalizáveis
- [ ] Sincronização em nuvem
- [ ] Subtarefas
- [ ] Anexos e notas
- [ ] Relatórios de produtividade

## 🎯 Objetivos de Aprendizado Alcançados

✅ **Arquitetura Angular Moderna** - Standalone Components e Signals  
✅ **TypeScript Avançado** - Interfaces, Generics e Tipos Customizados  
✅ **Gerenciamento de Estado** - Service com Signals  
✅ **CSS Moderno** - Flexbox, Grid, Animations  
✅ **UX/UI Design** - Interface limpa e responsiva  
✅ **Boas Práticas** - Organização e Estrutura  
✅ **Persistência** - LocalStorage e Error Handling  
✅ **Reatividade** - Computed Values e Event Handling  

## 📄 Licença

Este é um projeto de aprendizado e pode ser usado livremente para fins educacionais.

---

**Desenvolvido como projeto de aprendizado Angular** 🎓