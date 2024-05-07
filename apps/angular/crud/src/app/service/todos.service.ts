import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { todos } from '../model/todos.model';
import { GlobalErrorService } from './global-error.service';
import { GlobalLoadingService } from './global-loading.service';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(
    private http: HttpClient,
    private errorService: GlobalErrorService,
    private loadingService: GlobalLoadingService,
  ) {}
  getTodos(): Observable<todos[]> {
    this.loadingService.startLoading();
    return this.http.get<todos[]>(this.apiUrl).pipe(
      finalize(() => this.loadingService.stopLoading()),
      catchError((err) => this.handleError(err)),
    );
  }
  updateTodos(todo: todos): Observable<todos> {
    this.loadingService.startLoading();
    // return throwError(() => new Error('Testing error')).pipe(
    //   finalize(() => this.loadingService.stopLoading()),
    //   catchError(err => this.handleError(err))
    // );
    return this.http
      .put<todos>(
        `${this.apiUrl}/${todo.id}`,
        {
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        finalize(() => this.loadingService.stopLoading()),
        catchError((err) => this.handleError(err)),
      );
  }

  deleteTodos(id: number): Observable<void> {
    this.loadingService.startLoading();
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.loadingService.stopLoading()),
      catchError((err) => this.handleError(err)),
    );
  }
  private handleError(err: any): Observable<never> {
    this.errorService.showError(
      'An error occurred while processing your request.',
    );
    return throwError(() => err);
  }
}
