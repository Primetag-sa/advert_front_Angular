import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {TiktokService} from "../../../services/api/tiktok.service";
import {DatePipe} from "@angular/common";
import {selectAuthenticatedUser} from "../../../store/auth/auth.selectors";
import {selectEntityList} from "../../../store/crud/crud.selectors";
import {getAllNoPagination} from "../../../store/crud/crud.actions";

@Component({
  selector: 'app-admin-rapport',
  templateUrl: './admin-rapport.component.html',
  styleUrl: './admin-rapport.component.scss'
})
export class AdminRapportComponent {

}
