import { createAction, props } from '@ngrx/store';
import { Review, ReviewData } from '../../models/review.model';

export const addReviewRequest = createAction(
  '[Review] Add Request',
  props<{reviewData: ReviewData}>()
);
export const addReviewSuccess = createAction(
  '[Review] Add Success',
  props<{review: Review}>()
);
export const addReviewFailure = createAction(
  '[Review] Add Failure',
  props<{error: string}>()
)

export const getReviewsRequest = createAction(
  '[Reviews] Fetch Request',
  props<{id: string}>()
);
export const getReviewsSuccess = createAction(
  '[Reviews] Fetch Success',
  props<{reviews: Review[]}>()
);
export const getReviewsFailure = createAction(
  '[Reviews] Fetch Failure',
  props<{error: string}>()
)


