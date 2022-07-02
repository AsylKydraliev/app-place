import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../../models/places.model';

export const fetchPlacesRequest = createAction(
  '[Places] Fetch Request'
);
export const fetchPlacesSuccess = createAction(
  '[Places] Fetch Success',
  props<{places: Place[]}>()
);
export const fetchPlacesFailure = createAction(
  '[Places] Fetch Failure',
  props<{error: string}>()
)

export const createPlacesRequest = createAction(
  '[Place] Create Request',
  props<{placeData: PlaceData}>()
);
export const createPlacesSuccess = createAction(
  '[Place] Create Success',
  props<{place: Place}>()
);
export const createPlacesFailure = createAction(
  '[Place] Create Failure',
  props<{error: string}>()
)

export const getPlaceByIdRequest = createAction(
  '[Place] Fetch Request',
  props<{id: string}>()
);
export const getPlaceByIdSuccess = createAction(
  '[Place] Fetch Success',
  props<{place: Place}>()
);
export const getPlaceByIdFailure = createAction(
  '[Place] Fetch Failure',
  props<{error: string}>()
)


