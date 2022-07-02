import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Place, PlaceModel } from '../models/places.model';
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

  // createPlace(place: placeData){
  //   const formData = new FormData();
  //
  //   Object.keys(albumData).forEach(key => {
  //     if (albumData[key] !== null) {
  //       formData.append(key, albumData[key]);
  //     }
  //   });
  //   return this.http.post<ApiAlbumsData>(environment.apiUrl + `/albums`, formData);
  // }
}
