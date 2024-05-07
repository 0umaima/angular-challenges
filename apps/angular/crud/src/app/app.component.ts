import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalErrorModalComponent } from './global-error-modal.component';
import { todos } from './model/todos.model';
import { GlobalLoadingService } from './service/global-loading.service';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { TodosService } from './service/todos.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    GlobalErrorModalComponent,
  ],
  templateUrl: 'app.component.html',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  styles: [],
})
export class AppComponent implements OnInit {
  todosList = signal<todos[]>([]);
  loadingService = inject(GlobalLoadingService);

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos) => this.todosList.set(todos));
  }

  update(todo: todos): void {
    this.todoService.updateTodos(todo).subscribe({
      next: (updatedTodo) => {
        this.todosList.set(
          this.todosList().map((t) =>
            t.id === updatedTodo.id ? updatedTodo : t,
          ),
        );
      },
      error: (err) => {
        console.log('Caught an error:', err);
      },
    });
  }

  delete(id: number): void {
    this.todoService.deleteTodos(id).subscribe(() => {
      this.todosList.set(this.todosList().filter((t) => t.id !== id));
    });
  }
}
