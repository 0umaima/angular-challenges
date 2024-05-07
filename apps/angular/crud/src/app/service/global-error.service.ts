import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalErrorModalComponent } from '../global-error-modal.component';
@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService {
  private dialog = inject(MatDialog);

  message = signal<string>('');

  showError(message: string) {
    this.message.set(message);

    this.dialog.open(GlobalErrorModalComponent, {
      width: '300px',
      data: { message },
    });
  }

  clear() {
    this.message.set('');
    this.dialog.closeAll();
  }
}
