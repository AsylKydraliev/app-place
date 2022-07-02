import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { getImagesByPlaceFailure, getImagesByPlaceRequest, getImagesByPlaceSuccess } from './images.actions';

@Injectable()

export class ImagesEffects {

  constructor(
    private actions: Actions,
    private imagesService: ImagesService,
    private helpers: HelpersService,
    private router: Router
  ) {}

  // createPlace = createEffect(() => this.actions.pipe(
  //   ofType(createPlacesRequest),
  //   mergeMap(({placeData}) => this.placeService.createPlace(placeData).pipe(
  //       map(place => createPlacesSuccess({place})),
  //       tap(() => {
  //         this.helpers.openSnackbar('Place added');
  //         void this.router.navigate(['/']);
  //       }),
  //       catchError(() => of(createPlacesFailure({
  //         error: 'Something went wrong!'
  //       })))
  //     )
  //   ))
  // );

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
