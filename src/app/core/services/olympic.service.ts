import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Olympic } from '../models/olympic.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OlympicService {
    private apiUrl: string = environment.OLYMPIC_URL;

    private http: HttpClient = inject(HttpClient);

    fetchOlympics(): Observable<Olympic[]> {
        return this.http.get<Olympic[]>(this.apiUrl);
    }
}
