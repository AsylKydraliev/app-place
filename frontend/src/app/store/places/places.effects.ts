import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createPlacesFailure,
  createPlacesRequest,
  createPlacesSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess, getPlaceByIdFailure, getPlaceByIdRequest, getPlaceByIdSuccess
} from './places.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PlaceService } from '../../services/place.service';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()

export class PlacesEffects {

  constructor(
    private actions: Actions,
    private placeService: PlaceService,
    private helpers: HelpersService,
    private router: Router
  ) {}

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placeService.getPlaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() => of(fetchPlacesFailure({
        error: 'Something went wrong'
      })))
    ))
  ))

  createPlace = createEffect(() => this.actions.pipe(
    ofType(createPlacesRequest),
    mergeMap(({placeData}) => this.placeService.createPlace(placeData).pipe(
        map(place => createPlacesSuccess({place})),
        tap(() => {
          this.helpers.openSnackbar('Place added');
          void this.router.navigate(['/']);
        }),
        catchError(() => of(createPlacesFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );

  getPlaceById = createEffect(() => this.actions.pipe(
    ofType(getPlaceByIdRequest),
    mergeMap(({id}) => this.placeService.getPlaceById(id).pipe(
        map(place => getPlaceByIdSuccess({place})),
        catchError(() => of(getPlaceByIdFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );
}
