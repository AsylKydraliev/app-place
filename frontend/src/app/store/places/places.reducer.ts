import { PlaceState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createPlacesFailure,
  createPlacesRequest,
  createPlacesSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess, getPlaceByIdFailure, getPlaceByIdRequest, getPlaceByIdSuccess
} from './places.actions';

const initialState: PlaceState = {
  places: [],
  place: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlacesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createPlacesRequest, state => ({...state, createLoading: true})),
  on(createPlacesSuccess, (state, {place}) => ({...state, createLoading: false, place})),
  on(createPlacesFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(getPlaceByIdRequest, state => ({...state, fetchLoading: true})),
  on(getPlaceByIdSuccess, (state, {place}) => ({...state, fetchLoading: false, place})),
  on(getPlaceByIdFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
