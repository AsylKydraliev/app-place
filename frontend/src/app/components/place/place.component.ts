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
import { addReviewRequest, getReviewsRequest } from '../../store/reviews/reviews.actions';
import { Review, ReviewClass, ReviewData } from '../../models/review.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place!: Observable<PlaceModel | null>;
  images!: Observable<Images[] | null>;
  reviews!: Observable<Review[] | null>;
  user!: Observable<User | null>;
  apiUrl = environment.apiUrl;
  placeData!: PlaceModel | null;
  ratingNumber = [1, 2, 3, 4, 5];
  placeId = '';
  @ViewChild('formPhoto') addPhotoForm!: NgForm;
  @ViewChild('formReview') addReviewForm!: NgForm;
  reviewArr!: Review[] | null;
  sum!: number;
  totalSum!: number;
  food: number[] = [];
  service: number[] = [];
  interior: number[] = [];
  foodSum!: number;
  serviceSum!: number;
  interiorSum!: number;

  constructor(private store:Store<AppState>, private route: ActivatedRoute, config: NgbRatingConfig) {
    this.place = store.select(state => state.places?.place);
    this.images = store.select(state => state.images.images);
    this.user = store.select(state => state.users.user);
    this.reviews = store.select(state => state.reviews.reviews);
    this.reviews.subscribe(review => {
        this.reviewArr = review;
    })

    config.max = 5;
    config.readonly = true

    this.place.subscribe(place => {
      this.placeData = place;
      this.placeId = <string>place?._id;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(getPlaceByIdRequest({id: params['id']}));
      this.store.dispatch(getImagesByPlaceRequest({id: params['id']}));
      this.store.dispatch(getReviewsRequest({id: params['id']}));
    })

    this.reviewArr?.forEach(review => {
      this.food.push(review.foodRating);
      this.service.push(review.serviceRating);
      this.interior.push(review.interiorRating);
    })
    this.getSum();
  }

  getSum () {
    const sum = this.food.reduce((acc, number) => acc + number, 0);
    this.foodSum = Math.round(sum / this.food.length);

    const sum2 = this.service.reduce((acc, number) => acc + number, 0);
    this.serviceSum = Math.round(sum2 / this.food.length);

    const sum3 = this.interior.reduce((acc, number) => acc + number, 0);
    this.interiorSum = Math.round(sum3 / this.food.length);

    this.totalSum = Math.round((this.foodSum + this.serviceSum + this.interiorSum) / 3) ;
  }

  addReview() {
    const reviewData: ReviewData = {
      text: this.addReviewForm.value.text,
      foodRating: this.addReviewForm.value.foodRating,
      serviceRating: this.addReviewForm.value.serviceRating,
      interiorRating: this.addReviewForm.value.interiorRating,
      place: this.placeId,
    }

    this.store.dispatch(addReviewRequest({reviewData}));
  }

  addPhoto() {
    const imageData: ImageData = {
      image: this.addPhotoForm.value.image,
      place: this.placeId
    }

    this.store.dispatch(addPhotoRequest({imageData}));
  }
}
