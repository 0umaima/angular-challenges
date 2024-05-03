import { NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardComponent,
  cardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers() ?? []"
      class="bg-light-red"
      (addedItem)="addTeacher()">
      <img card-header src="assets/img/teacher.png" width="200px" />

      <ng-template card-list-item let-teacher>
        <app-list-item (deletedItem)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, NgForOf, cardListItemDirective, ListItemComponent],
})
export class TeacherCardComponent {
  readonly #store = inject(TeacherStore);
  readonly #http = inject(FakeHttpService);

  teachers = toSignal(
    this.#http.fetchTeachers$.pipe(
      tap((teachers) => this.#store.addAll(teachers)),
      switchMap(() => this.#store.teachers$),
    ),
  );
  addTeacher() {
    this.#store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.#store.deleteOne(id);
  }
}
