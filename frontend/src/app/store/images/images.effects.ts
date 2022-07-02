import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { ImagesService } from '../../services/images.service';
import {
  addPhotoFailure,
  addPhotoRequest,
  addPhotoSuccess,
  getImagesByPlaceFailure,
  getImagesByPlaceRequest,
  getImagesByPlaceSuccess
} from './images.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class ImagesEffects {

  constructor(
    private actions: Actions,
    private imagesService: ImagesService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}

  addPhoto = createEffect(() => this.actions.pipe(
    ofType(addPhotoRequest),
    mergeMap(({imageData}) => this.imagesService.addPhoto(imageData).pipe(
        map(image => addPhotoSuccess({image})),
        tap(() => {
          this.helpers.openSnackbar('Photo added');
          this.store.dispatch(getImagesByPlaceRequest({id: imageData.place}));
        }),
        catchError(() => of(addPhotoFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );

  getImagesByPlace = createEffect(() => this.actions.pipe(
    ofType(getImagesByPlaceRequest),
    mergeMap(({id}) => this.imagesService.getAllImagesByPLace(id).pipe(
        map(images => getImagesByPlaceSuccess({images})),
        catchError(() => of(getImagesByPlaceFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );
}
