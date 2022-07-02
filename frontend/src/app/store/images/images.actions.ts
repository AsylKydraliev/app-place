import { createAction, props } from '@ngrx/store';
import { Images } from '../../models/images.model';

// export const createPlacesRequest = createAction(
//   '[Place] Create Request',
//   props<{placeData: PlaceData}>()
// );
// export const createPlacesSuccess = createAction(
//   '[Place] Create Success',
//   props<{place: Place}>()
// );
// export const createPlacesFailure = createAction(
//   '[Place] Create Failure',
//   props<{error: string}>()
// )

export const getImagesByPlaceRequest = createAction(
  '[Images] Fetch Request',
  props<{id: string}>()
);
export const getImagesByPlaceSuccess = createAction(
  '[Images] Fetch Success',
  props<{images: Images[]}>()
);
export const getImagesByPlaceFailure = createAction(
  '[Images] Fetch Failure',
  props<{error: string}>()
)


