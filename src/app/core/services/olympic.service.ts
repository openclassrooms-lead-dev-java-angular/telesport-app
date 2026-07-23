import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Olympic } from '../models/olympic.model';
import { map, Observable } from 'rxjs';

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
    fetchCountries(): Observable<Olympic[]> {
        return this.http.get<Olympic[]>(this.apiUrl);
    }

    /**
     * Fetch country by id
     * 
     * @param id number
     * @returns Observable
     */
    fetchCountryById(id: number): Observable<Olympic | undefined> {
        return this.fetchCountries().pipe(
            map((olympics: Olympic[]) =>
                olympics
                    .find((olympic: Olympic) => olympic.id === id)

            ));
    }
}
