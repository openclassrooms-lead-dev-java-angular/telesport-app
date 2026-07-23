import { Routes } from '@angular/router';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { CountryDetailComponent } from './feature/country-detail/country-detail.component';
import { MedalDashboardComponent } from './feature/medal-dashboard/medal-dashboard.component';


export const routes: Routes = [
    {
        path: '',
        component: MedalDashboardComponent,
    },
    {
        path: 'country/:countryId',
        component: CountryDetailComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
