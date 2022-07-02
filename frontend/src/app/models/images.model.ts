export interface Images {
  image: string,
  place: string,
  user: string
}

export class Image {
  constructor(
    public image: string,
    public place: string,
    public user: string
  ) {
  }
}



