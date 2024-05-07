import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GlobalErrorService } from './service/global-error.service';
@Component({
  selector: 'app-global-error-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="clear()">Close</button>
    </mat-dialog-actions>
  `,
})
export class GlobalErrorModalComponent {
  private dialogRef = inject(MatDialogRef<GlobalErrorModalComponent>);
  private errorService = inject(GlobalErrorService);
  public data = inject(MAT_DIALOG_DATA);
  clear() {
    this.errorService.clear();
    this.dialogRef.close();
  }
}
