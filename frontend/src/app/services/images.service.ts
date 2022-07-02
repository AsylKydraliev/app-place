import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image, ImageData, Images } from '../models/images.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getAllImagesByPLace(id: string) {
    return this.http.get<Images[]>(environment.apiUrl + '/images/' + id).pipe(
      map(response => {
        return response.map(result => {
          return new Image(
            result._id,
            result.image,
            result.place,
            result.user,
          )
        })
      })
    );
  }

  addPhoto(imageData: ImageData) {
    const formData = new FormData();
    formData.append('place', imageData.place);

    if (imageData.image) {
      formData.append('image', imageData.image);
    }

    return this.http.post<Images>(environment.apiUrl + '/images/addPhoto', formData);
  }
}
