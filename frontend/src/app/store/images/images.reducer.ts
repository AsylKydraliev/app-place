import { ImagesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  addPhotoFailure, addPhotoRequest, addPhotoSuccess,
  getImagesByPlaceFailure,
  getImagesByPlaceRequest,
  getImagesByPlaceSuccess
} from './images.actions';

const initialState: ImagesState = {
  images: [],
  image: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
};

export const imagesReducer = createReducer(
  initialState,
  on(addPhotoRequest, state => ({...state, createLoading: true})),
  on(addPhotoSuccess, (state, {image}) => ({...state, createLoading: false, image})),
  on(addPhotoFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(getImagesByPlaceRequest, state => ({...state, fetchLoading: true})),
  on(getImagesByPlaceSuccess, (state, {images}) => ({...state, fetchLoading: false, images})),
  on(getImagesByPlaceFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
