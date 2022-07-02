export interface Place {
  _id: string,
  title: string,
  description: string,
  mainImage: string,
  user: string,
  reviews: Review[]
}

export interface PlaceData {
  [key: string]: any,
  title: string,
  description: string,
  mainImage: string,
  user: string,
}

export class PlaceModel {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public mainImage: string,
    public user: string,
    public reviews: Review[],
  ) {}
}

export interface Image {
  image: string,
  place: string,
  user: string
}

export interface Review {
  text: string,
  rating: number,
  place: string,
  user: string
}



