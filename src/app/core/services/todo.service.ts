import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoItem, CreateTodoDto } from '../models/todo-item.model';
import { Observable, catchError, tap, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly url = `${environment.apiUrl}/todo`;

  todos = signal<ToDoItem[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(private http: HttpClient, public toast: ToastService) {}

  private resetMessages() {
    this.error.set(null);
    this.success.set(null);
  }

  getTodos() {
    this.resetMessages();
    this.loading.set(true);

    this.http
      .get<ToDoItem[]>(this.url)
      .pipe(
        tap(() => this.loading.set(false)),
        catchError(() => {
          this.error.set('Błąd pobierania danych.');
          this.loading.set(false);
          return of([]);
        })
      )
      .subscribe((list) => this.todos.set(list));
  }

  addTodo(dto: CreateTodoDto): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.url, dto).pipe(
      tap(() => this.toast.show('success', 'Dodano zadanie!')),
      catchError(() => {
        this.toast.show('error', 'Nie udało się dodać zadania');
        return of(null as any);
      })
    );
  }

  updateTodo(id: number, dto: CreateTodoDto): Observable<any> {
    return this.http.put(`${this.url}/${id}`, dto).pipe(
      tap(() => this.toast.show('success', 'Zapisano zmiany')),
      catchError(() => {
        this.toast.show('error', 'Nie udało się zapisać zmian');
        return of(null);
      })
    );
  }

  toggleTodoOptimistic(t: ToDoItem) {
    const original = { ...t };
    t.isDone = !t.isDone;

    this.http
      .patch(`${this.url}/${t.id}/toggle`, {})
      .pipe(
        tap(() => this.toast.show('success', 'Status zaktualizowany')),
        catchError(() => {
          this.toast.show('error', 'Nie udało się zmienić statusu');
          t.isDone = original.isDone;
          return of(null);
        })
      )
      .subscribe();
  }
}
