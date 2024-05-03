import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent, cardListItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      class="bg-light-green"
      (addedItem)="addStudent()">
      <img card-header src="assets/img/student.webp" width="200px" />
      <ng-template card-list-item let-student>
      <app-list-item
       
       >{{student.firstName}}</app-list-item>
    </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent,  ListItemComponent, NgForOf, cardListItemDirective],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }
}
