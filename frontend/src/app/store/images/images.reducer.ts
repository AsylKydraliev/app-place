import { ImagesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { getImagesByPlaceFailure, getImagesByPlaceRequest, getImagesByPlaceSuccess } from './images.actions';

const initialState: ImagesState = {
  images: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
};

export const imagesReducer = createReducer(
  initialState,
  // on(createPlacesRequest, state => ({...state, createLoading: true})),
  // on(createPlacesSuccess, (state, {place}) => ({...state, createLoading: false, place})),
  // on(createPlacesFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(getImagesByPlaceRequest, state => ({...state, fetchLoading: true})),
  on(getImagesByPlaceSuccess, (state, {images}) => ({...state, fetchLoading: false, images})),
  on(getImagesByPlaceFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
