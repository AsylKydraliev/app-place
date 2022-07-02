import { LoginError, RegisterError, User } from '../models/user.model';
import { PlaceModel } from '../models/places.model';
import { Images } from '../models/images.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PlaceState = {
  places: PlaceModel[],
  place: PlaceModel | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string
}

export type ImagesState = {
  images: Images[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string
}

export type AppState = {
  users: UserState,
  places: PlaceState,
  images: ImagesState,
};
