import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image, Images } from '../models/images.model';
import { map } from 'rxjs';
import { Review, ReviewClass, ReviewData } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewsByPLace(id: string) {
    return this.http.get<Review[]>(environment.apiUrl + '/reviews/' + id).pipe(
      map(response => {
        return response.map(result => {
          return new ReviewClass(
            result._id,
            result.text,
            result.foodRating,
            result.serviceRating,
            result.interiorRating,
            result.place,
            result.user,
            result.date
          )
        })
      })
    );
  }

  addReview(reviewData: ReviewData) {
    return this.http.post<Review>(environment.apiUrl + '/reviews/addReview', reviewData);
  }
}
