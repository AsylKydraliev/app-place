export interface Place {
  _id: string,
  title: string,
  description: string,
  mainImage: string,
  user: string,
  rate: number
}

export interface PlaceData {
  [key: string]: any,
  title: string,
  description: string,
  mainImage: string,
  user: string,
  agree: boolean
}

export class PlaceModel {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public mainImage: string,
    public user: string,
    public rate: number
  ) {}
}






