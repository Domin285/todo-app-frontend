import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoItem, CreateTodoDto } from '../../../core/models/todo-item.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input() todo: ToDoItem | null = null;

  @Output() create = new EventEmitter<CreateTodoDto>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';
  isDone = false;

  ngOnChanges() {
    if (this.todo) {
      this.title = this.todo.title;
      this.description = this.todo.description ?? '';
      this.isDone = this.todo.isDone;
    }
  }

  submit() {
    const dto: CreateTodoDto = {
      title: this.title.trim(),
      description: this.description,
      isDone: this.isDone,
    };

    if (!this.todo) {
      this.create.emit(dto);
      this.reset();
    }
  }

  reset() {
    this.title = '';
    this.description = '';
    this.isDone = false;
  }
}
