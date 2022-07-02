import { ReviewState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  addReviewFailure,
  addReviewRequest,
  addReviewSuccess, getReviewsFailure, getReviewsRequest, getReviewsSuccess,
} from './reviews.actions';

const initialState: ReviewState = {
  reviews: [],
  review: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
};

export const reviewsReducer = createReducer(
  initialState,
  on(addReviewRequest, state => ({...state, createLoading: true})),
  on(addReviewSuccess, (state, {review}) => ({...state, createLoading: false, review})),
  on(addReviewFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(getReviewsRequest, state => ({...state, fetchLoading: true})),
  on(getReviewsSuccess, (state, {reviews}) => ({...state, fetchLoading: false, reviews})),
  on(getReviewsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
