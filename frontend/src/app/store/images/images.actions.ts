import { createAction, props } from '@ngrx/store';
import { Images, ImageData } from '../../models/images.model';

export const addPhotoRequest = createAction(
  '[Image] Add Request',
  props<{imageData: ImageData}>()
);
export const addPhotoSuccess = createAction(
  '[Image] Add Success',
  props<{image: Images}>()
);
export const addPhotoFailure = createAction(
  '[Image] Add Failure',
  props<{error: string}>()
)

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


