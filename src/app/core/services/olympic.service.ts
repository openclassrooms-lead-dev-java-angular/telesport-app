// src/app/core/services/olympic.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Country } from 'src/app/core/models/country.model';

@Injectable({
    providedIn: 'root',
})
export class OlympicService {
    private apiUrl: string = environment.OLYMPIC_URL;

    private http: HttpClient = inject(HttpClient);

    /**
     * Fetch all countries
     * 
     * @returns Observable
     */
    fetchCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.apiUrl);
    }

    /**
     * Fetch country by id
     * 
     * @param id number
     * @returns Observable
     */
    fetchCountryById(id: number): Observable<Country | undefined> {
        return this.fetchCountries().pipe(
            map((countries: Country[]) =>
                countries
                    .find((country: Country) => country.id === id)

            ));
    }
}
