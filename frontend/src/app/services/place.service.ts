import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Place, PlaceModel, PlaceData } from '../models/places.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces() {
    return this.http.get<Place[]>(environment.apiUrl + '/places').pipe(
      map(response => {
        return response.map(places => {
          return new PlaceModel(
            places._id,
            places.title,
            places.description,
            places.mainImage,
            places.user,
            places.rate,
          )
        })
      })
    );
  }

  createPlace(placeData: PlaceData){
    const formData = new FormData();

    Object.keys(placeData).forEach(key => {
      if (placeData[key] !== null) {
        formData.append(key, placeData[key]);
      }
    });
    return this.http.post<Place>(environment.apiUrl + `/places`, formData);
  }

  getPlaceById(id: string) {
    return this.http.get<Place>(environment.apiUrl + '/places/' + id);
  }
}
