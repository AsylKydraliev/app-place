import { LoginError, RegisterError, User } from '../models/user.model';
import { PlaceModel } from '../models/places.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PlaceState = {
  places: PlaceModel[],
  fetchLoading: boolean,
  fetchError: null | string,
}

export type AppState = {
  users: UserState,
  places: PlaceState
};
