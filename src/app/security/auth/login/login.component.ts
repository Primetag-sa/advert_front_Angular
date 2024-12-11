import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";
import {selectAuthError} from "../../../store/auth/auth.selectors";
import * as authActions from "../../../store/auth/auth.actions";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email = '';
  password = '';
  errorMessage: string | null = null;
  error$: Observable<string | null>;


  constructor(
    private formBuilder: FormBuilder,
    private store:Store
  ) {


    // cas d'erreur login
    this.error$ = this.store.select(selectAuthError);
    this.error$.subscribe(error => {

      if (error && typeof error !== 'object') {
        this.errorMessage = error;
        setTimeout(() => {
          this.errorMessage = null; // Masquer le message d'erreur après 3 secondes
        }, 3000);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  login(): void {
    this.errorMessage = ''; // Clear previous error messages
    this.store.dispatch(authActions.login({ email: this.email, password: this.password }));
  }
}
