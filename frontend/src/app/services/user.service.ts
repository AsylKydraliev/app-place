import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginUserData, RegisterUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  registerUser(userData: RegisterUser) {
    const formData = new FormData;
    formData.append('email', userData.email);
    formData.append('displayName', userData.displayName);
    formData.append('password', userData.password);

    if(userData.avatar) {
      formData.append('avatar', userData.avatar);
    }

    return this.http.post<User>(environment.apiUrl + '/users', formData);
  }

  loginUser(userData: LoginUserData){
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  logoutUser(){
    return this.http.delete(environment.apiUrl + '/users/sessions');
  }
}
