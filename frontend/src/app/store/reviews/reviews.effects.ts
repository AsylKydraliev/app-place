import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import {
  addReviewFailure,
  addReviewRequest,
  addReviewSuccess, getReviewsFailure,
  getReviewsRequest,
  getReviewsSuccess
} from './reviews.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { ReviewService } from '../../services/review.service';

@Injectable()
export class ReviewsEffects {

  constructor(
    private actions: Actions,
    private reviewsService: ReviewService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}

  addReview = createEffect(() => this.actions.pipe(
    ofType(addReviewRequest),
    mergeMap(({reviewData}) => this.reviewsService.addReview(reviewData).pipe(
        map(review => addReviewSuccess({review})),
        tap(() => {
          this.helpers.openSnackbar('Review added');
          // this.store.dispatch(getImagesByPlaceRequest({id: imageData.place}));
        }),
        catchError(() => of(addReviewFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );

  getReviews = createEffect(() => this.actions.pipe(
    ofType(getReviewsRequest),
    mergeMap(({id}) => this.reviewsService.getReviewsByPLace(id).pipe(
        map(reviews => getReviewsSuccess({reviews})),
        catchError(() => of(getReviewsFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );
}
