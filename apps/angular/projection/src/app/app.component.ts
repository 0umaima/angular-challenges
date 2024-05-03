import { TeacherCardComponent } from './component/teacher-card/teacher-card.component';
import { Component } from '@angular/core';
import { CityCardComponent } from './component/city-card/city-card.component';
import { StudentCardComponent } from './component/student-card/student-card.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="grid grid-cols-3 gap-3 px-5">
      <app-student-card></app-student-card>
      <app-city-card></app-city-card>
      <app-teacher-card></app-teacher-card>
    </div>
  `,
  standalone: true,
  imports: [ TeacherCardComponent, StudentCardComponent, CityCardComponent],
})
export class AppComponent {}
