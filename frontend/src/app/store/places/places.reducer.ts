import { PlaceState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { fetchPlacesFailure, fetchPlacesRequest, fetchPlacesSuccess } from './places.actions';

const initialState: PlaceState = {
  places: [],
  fetchLoading: false,
  fetchError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlacesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
