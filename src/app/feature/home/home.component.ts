import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PageTitleComponent } from "src/app/shared/components/page-title/page-title.component";
import { StatisticCardComponent } from 'src/app/shared/components/statistic-card/statistic-card.component';
import { ChartData } from 'src/app/core/models/chart-data.model';
import { PieChartComponent } from 'src/app/shared/components/pie-chart/pie-chart.component';

@Component({
    selector: 'app-home',
    imports: [
        PageTitleComponent,
        StatisticCardComponent,
        PieChartComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    // attributes
    protected pageTitle: string = "Medals per Country";
    protected totalJOs = signal(0);
    protected totalCountries = signal(0);
    protected chartData = signal<ChartData>({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            hoverOffset: 0
        }]
    });
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

    updateStatitics(data: Olympic[]): void {
        this.totalCountries.set(data.length);
        this.totalJOs.set(
            Array.from(
                new Set(data.map((i: any) => i.participations.map((f: any) => f.year)).flat())
            ).length
        );
    }

    buildPieChart(data: Olympic[]) {
        const countries: string[] = data.map((i: any) => i.country);
        const medals = data.map((i: any) => i.participations.map((i: any) => (i.medalsCount)));
        const sumOfAllMedalsYears = medals.map((i) => i.reduce((acc: any, i: any) => acc + i, 0));

        this.chartData.set({
            labels: countries,
            datasets: [{
                label: 'Medals',
                data: sumOfAllMedalsYears,
                backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
                hoverOffset: 4
            }]
        })
    }

    navigateToCountry(label: string): void {
        this.router.navigate(['country', label]);
    }
}
