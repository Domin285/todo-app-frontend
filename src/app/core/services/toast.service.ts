import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(type: 'success' | 'error', message: string) {
    const id = Date.now();
    const toast: Toast = { id, type, message };

    this.toasts.update((t) => [...t, toast]);

    setTimeout(() => this.remove(id), 4000);
  }

  remove(id: number) {
    this.toasts.update((t) => t.filter((x) => x.id !== id));
  }
}
