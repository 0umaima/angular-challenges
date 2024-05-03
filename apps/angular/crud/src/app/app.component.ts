import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { todos } from './model/todos.model';
import { TodosService } from './service/todos.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  todosList!: todos[];

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todosList = todos;
      },
      error: (err) => console.error('Failed to update the todo :', err),
    });
  }

  update(todo: todos): void {
    this.todoService.updateTodos(todo).subscribe((todoUpdated) => {
      this.todosList = this.todosList.map((t) =>
        t.id === todoUpdated.id ? todoUpdated : t,
      );
    });
  }

  delete(id: number): void {
    this.todoService.deleteTodos(id).subscribe({
      next: () => {
        this.todosList = this.todosList.filter((t) => t.id !== id);
      },
      error: (err) => console.error('Failed to delete the todo :', err),
    });
  }
}
