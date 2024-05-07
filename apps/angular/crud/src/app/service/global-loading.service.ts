import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalLoadingService {
  loading = signal<boolean>(false);

  startLoading() {
    this.loading.set(true);
  }

  stopLoading() {
    this.loading.set(false);
  }
}
