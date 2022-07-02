import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchPlacesRequest } from '../../store/places/places.actions';
import { Observable } from 'rxjs';
import { Place } from '../../models/places.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  places!: Observable<Place[]>;
  apiUrl = environment.apiUrl;

  constructor(private store:Store<AppState>) {
    this.places = store.select(state => state.places?.places);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

}
