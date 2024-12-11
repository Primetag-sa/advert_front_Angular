
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  notify(message: string) {
    this.messageSubject.next(message);
    setTimeout(() => this.clear(), 4000); // Clear message after 3 seconds
  }

  clear() {
    this.messageSubject.next(null);
  }
}
