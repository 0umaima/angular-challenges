import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true
})

export class cardListItemDirective {}
@Component({
  selector: 'app-card',
  template: `
  
      <ng-content select="[card-header]"></ng-content>

      <section>
        <ng-template *ngFor="let item of list" 
        [ngTemplateOutlet]="rowTemplate"   
        [ngTemplateOutletContext]="{$implicit: item}" 
        />
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addedItem.emit()">
        Add
      </button>
  `,
  host: {
    class:'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4'
  },
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() addedItem: EventEmitter<void> = new EventEmitter<void>;
  @ContentChild(cardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{$implicit: T}>;  
}
