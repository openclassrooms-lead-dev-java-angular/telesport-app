import { Routes } from '@angular/router';
import { HomeComponent as HomeComponentBis } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { HomeComponent } from './feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponentBis,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'country/:countryName',
    component: CountryComponent
  },

  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
