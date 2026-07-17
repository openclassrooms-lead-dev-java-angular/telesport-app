import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PageTitleComponent } from "src/app/shared/components/page-title/page-title.component";

@Component({
    selector: 'app-home',
    imports: [PageTitleComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    // attributes
    protected pageTitle: string = "Medals per Country";
    private olympics!: Observable<Olympic[] | undefined>;

    // contructor
    private olympicService = inject(OlympicService);

    ngOnInit() {
        this.olympics = this.olympicService.fetchOlympics();
        this.olympics.pipe(
            map(value => console.log(value))
        ).subscribe();
    }


    buildPieChart(countries: string[], sumOfAllMedalsYears: number[]) {

    }
}
