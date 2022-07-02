import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginError } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { loginUsersRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  loading!: Observable<boolean>;
  error!: Observable<null | LoginError>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.loginError);
    this.loading = store.select(state => state.users.loginLoading);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.store.dispatch(loginUsersRequest({userData: this.form.value}));
  }
}
