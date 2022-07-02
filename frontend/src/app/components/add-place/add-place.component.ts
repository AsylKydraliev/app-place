import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createPlacesRequest } from '../../store/places/places.actions';
import { NgForm } from '@angular/forms';
import { PlaceData } from '../../models/places.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit, OnDestroy {

  @ViewChild('f') form!: NgForm;
  loading!: Observable<boolean>;
  user!: Observable<User | null>;
  userId!: string | undefined;
  userSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
   this.userSub =  this.user.subscribe(user => {
      this.userId = user?._id;
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const placeData: PlaceData = {
      title: this.form.value.title,
      description: this.form.value.description,
      mainImage: this.form.value.mainImage,
      user: <string>this.userId,
      agree: this.form.value.agree
    }
    this.store.dispatch(createPlacesRequest({placeData: placeData}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
