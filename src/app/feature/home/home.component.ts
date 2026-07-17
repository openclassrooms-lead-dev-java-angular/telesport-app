import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PageTitleComponent } from "src/app/shared/components/page-title/page-title.component";
import { StatisticCardComponent } from 'src/app/shared/components/statistic-card/statistic-card.component';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-home',
    imports: [
        PageTitleComponent,
        StatisticCardComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    // attributes
    protected pageTitle: string = "Medals per Country";
    protected totalJOs = signal(0);
    protected totalCountries = signal(0);
    protected pieChart!: Chart<"pie", number[], string>;
    private olympics!: Observable<Olympic[] | undefined>;

    // contructor
    private olympicService = inject(OlympicService);
    private router = inject(Router);

    ngOnInit() {
        this.olympics = this.olympicService.fetchOlympics();
        this.olympics.subscribe(data => {
            if (data && data.length > 0) {
                this.updateStatitics(data);
                this.buildPieChart(data);
            }
        });
    }

    updateStatitics(data: Olympic[]) {
        this.totalCountries.set(data.length);
        this.totalJOs.set(
            Array.from(
                new Set(data.map((i: any) => i.participations.map((f: any) => f.year)).flat())
            ).length
        );
    }

    buildPieChart(data: Olympic[]) {

    }
}
