import { User } from './user.model';

export interface Review {
  _id: string,
  text: string,
  foodRating: number,
  serviceRating: number,
  interiorRating: number,
  place: string,
  user: User,
  date: string
}

export interface ReviewData {
  text: string,
  foodRating: number,
  serviceRating: number,
  interiorRating: number,
  place: string,
}

export class ReviewClass {
  constructor(
    public _id: string,
    public text: string,
    public foodRating: number,
    public serviceRating: number,
    public interiorRating: number,
    public place: string,
    public user: User,
    public date: string,
  ) {}
}



