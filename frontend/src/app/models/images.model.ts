export interface Images {
  _id: string,
  image: string,
  place: string,
  user: string
}

export class Image {
  constructor(
    public _id: string,
    public image: string,
    public place: string,
    public user: string
  ) {
  }
}

export interface ImageData {
  image: File,
  place: string,
}



