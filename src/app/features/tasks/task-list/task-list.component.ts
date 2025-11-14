import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../core/services/todo.service';
import { ToDoItem } from '../../../core/models/todo-item.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  filter = signal('');
  statusFilter = signal('');
  sortOrder = signal<'asc' | 'desc' | ''>('');

  creating = signal(false);
  editing = signal<ToDoItem | null>(null);

  newTitle = '';
  newDesc = '';
  newDone = false;

  editTitle = '';
  editDesc = '';
  editDone = false;

  constructor(public todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos();
  }

  startCreating() {
    this.creating.set(true);
  }

  cancelCreating() {
    this.creating.set(false);
    this.newTitle = '';
    this.newDesc = '';
    this.newDone = false;
  }

  createTask() {
    this.todoService
      .addTodo({
        title: this.newTitle.trim(),
        description: this.newDesc,
        isDone: this.newDone,
      })
      .subscribe(() => {
        this.todoService.getTodos();
        this.cancelCreating();
      });
  }

  startEdit(todo: ToDoItem) {
    this.editing.set(todo);
    this.editTitle = todo.title;
    this.editDesc = todo.description ?? '';
    this.editDone = todo.isDone;
  }

  cancelEdit() {
    this.editing.set(null);
    this.editTitle = '';
    this.editDesc = '';
    this.editDone = false;
  }

  saveEdit(id: number) {
    this.todoService
      .updateTodo(id, {
        title: this.editTitle.trim(),
        description: this.editDesc,
        isDone: this.editDone,
      })
      .subscribe(() => {
        this.todoService.getTodos();
        this.cancelEdit();
      });
  }

  toggleDoneOptimistic(todo: ToDoItem) {
    this.todoService.toggleTodoOptimistic(todo);
  }

  filtered = computed(() => {
    const list = this.todoService.todos();
    const term = this.filter().toLowerCase();
    const status = this.statusFilter();
    const order = this.sortOrder();

    let result = list.filter(
      (t) =>
        t.title.toLowerCase().includes(term) &&
        (status === '' || (status === 'done' && t.isDone) || (status === 'pending' && !t.isDone))
    );

    if (order === '') {
      return result.sort((a, b) => a.id - b.id);
    }

    return result.sort((a, b) =>
      order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  });
}
