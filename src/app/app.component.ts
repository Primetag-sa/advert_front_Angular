import { Component,OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {NotifyService} from "./services/core/notify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'advert';
  notification$: Observable<string | null>;
  constructor(private notificationService: NotifyService) {
    this.notification$ = this.notificationService.message$;
  }

}
