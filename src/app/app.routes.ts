import { Routes } from '@angular/router';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { CountryComponent } from "./feature/country/country.component";
import { HomeComponent } from './feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'country/:countryName',
    component: CountryComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
