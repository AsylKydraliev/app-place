import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { registerUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('f') form!: NgForm;
  error!: Observable<null | RegisterError>;
  loading!: Observable<boolean>;
  errorSubscription!: Subscription;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit() {
    this.errorSubscription = this.error.subscribe(error => {
      if(error){
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
        console.log(message)
      }else{
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.store.dispatch(registerUserRequest({users: this.form.value}));
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
