import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { PlaceModel } from '../../models/places.model';
import { environment } from '../../../environments/environment';
import { getPlaceByIdRequest } from '../../store/places/places.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place!: Observable<PlaceModel | null>;
  apiUrl = environment.apiUrl;
  placeData!: PlaceModel | null;

  constructor(private store:Store<AppState>, private route: ActivatedRoute) {
    this.place = store.select(state => state.places?.place);
    this.place.subscribe(place => {
      this.placeData = place;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(getPlaceByIdRequest({id: params['id']}));
    })
  }
}
