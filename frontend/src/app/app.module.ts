import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './store/users/users.reducer';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ValidateIdenticalDirective } from './validate-identical.directive';
import { UsersEffects } from './store/users/users.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { placesReducer } from './store/places/places.reducer';
import { PlacesEffects } from './store/places/places.effects';
import { AuthInterceptor } from './auth.interceptor';
import { PlaceComponent } from './components/place/place.component';
import { ImagesEffects } from './store/images/images.effects';
import { imagesReducer } from './store/images/images.reducer';
import { MatSelectModule } from '@angular/material/select';
import { reviewsReducer } from './store/reviews/reviews.reducer';
import { ReviewsEffects } from './store/reviews/reviews.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: Array<MetaReducer> = [localStorageSyncReducer];

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        FileInputComponent,
        ValidateIdenticalDirective,
        AddPlaceComponent,
        PlaceComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      users: usersReducer,
      places: placesReducer,
      images: imagesReducer,
      reviews: reviewsReducer,
    }, {metaReducers}),
    EffectsModule.forRoot([
      UsersEffects, PlacesEffects, ImagesEffects, ReviewsEffects
    ]),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
