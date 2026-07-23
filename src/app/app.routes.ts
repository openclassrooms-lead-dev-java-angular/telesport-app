import { Routes } from '@angular/router';
import { NotFoundComponent } from './feature/not-found/page/not-found.component';
import { CountryDetailComponent } from './feature/country-detail/page/country-detail.component';
import { MedalDashboardComponent } from './feature/medal-dashboard/page/medal-dashboard.component';


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
