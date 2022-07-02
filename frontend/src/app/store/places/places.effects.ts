import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchPlacesFailure, fetchPlacesRequest, fetchPlacesSuccess } from './places.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PlaceService } from '../../services/place.service';

@Injectable()

export class PlacesEffects {

  constructor(
    private actions: Actions,
    private placeService: PlaceService,
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
}
