import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { PlaceModel } from '../../models/places.model';
import { environment } from '../../../environments/environment';
import { getPlaceByIdRequest } from '../../store/places/places.actions';
import { ActivatedRoute } from '@angular/router';
import { addPhotoRequest, getImagesByPlaceRequest } from '../../store/images/images.actions';
import { ImageData, Images } from '../../models/images.model';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place!: Observable<PlaceModel | null>;
  images!: Observable<Images[] | null>;
  user!: Observable<User | null>;
  apiUrl = environment.apiUrl;
  placeData!: PlaceModel | null;
  ratingNumber = [1, 2, 3, 4, 5];
  placeId = '';
  @ViewChild('formPhoto') addPhotoForm!: NgForm;
  @ViewChild('formReview') addReviewForm!: NgForm;

  constructor(private store:Store<AppState>, private route: ActivatedRoute) {
    this.place = store.select(state => state.places?.place);
    this.images = store.select(state => state.images.images);
    this.user = store.select(state => state.users.user);

    this.place.subscribe(place => {
      this.placeData = place;
      this.placeId = <string>place?._id;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(getPlaceByIdRequest({id: params['id']}));
      this.store.dispatch(getImagesByPlaceRequest({id: params['id']}));
    })
  }

  addReview() {

  }

  addPhoto() {
    const imageData: ImageData = {
      image: this.addPhotoForm.value.image,
      place: this.placeId
    }

    this.store.dispatch(addPhotoRequest({imageData}));
  }
}
