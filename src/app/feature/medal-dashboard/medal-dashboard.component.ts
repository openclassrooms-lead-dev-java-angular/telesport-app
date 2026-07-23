import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PageTitleComponent } from 'src/app/shared/components/page-title/page-title.component';
import { StatisticCardComponent } from 'src/app/shared/components/statistic-card/statistic-card.component';
import { PieChartData } from 'src/app/core/models/chart-data.model';
import { Participation } from 'src/app/core/models/participation.model';
import { ChartType } from 'src/app/core/enums/chart-type.enum';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
    selector: 'app-medal-dashboard',
    imports: [
        PageTitleComponent,
        StatisticCardComponent,
        ChartComponent,
        SpinnerComponent
    ],
    templateUrl: './medal-dashboard.component.html',
    styleUrl: './medal-dashboard.component.scss',
})
export class MedalDashboardComponent implements OnInit {
    // attributes
    protected pageTitle = 'Medals per Country';
    protected totalJOs = signal(0);
    protected totalCountries = signal(0);
    protected chartData = signal<PieChartData>({
        type: ChartType.PIE,
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
                hoverOffset: 0,
            },
        ],
    });
    public error = signal('');
    public isLoading = signal(true);
    private olympicsData: Olympic[] = [];

    // contructor
    private olympicService = inject(OlympicService);
    private router = inject(Router);

    ngOnInit() {
        this.olympicService
            .fetchOlympics()
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (data) => {
                    this.olympicsData = data;
                    this.updateStatitics(data);
                    this.buildPieChart(data);
                },
                error: (error) => {
                    this.error.set(
                        'Oops! Even champions need a break sometimes.The data failed to load—please try again in a moment.'
                    );
                    console.error(error.message);
                },
            });
    }

    updateStatitics(data: Olympic[]): void {
        this.totalCountries.set(this.olympicsData.length);
        this.totalJOs.set(
            Array.from(
                new Set(
                    data
                        .map((i: Olympic) => i.participations.map((f: Participation) => f.year))
                        .flat()
                )
            ).length
        );
    }

    buildPieChart(data: Olympic[]) {
        const countries: string[] = data.map((i: Olympic) => i.country);
        const medals: number[][] = data.map((i: Olympic) =>
            i.participations.map((i: Participation) => i.medalsCount)
        );
        const sumOfAllMedalsYears = medals.map((i) =>
            i.reduce((acc: number, i: number) => acc + i, 0)
        );

        this.chartData.set({
            type: ChartType.PIE,
            labels: countries,
            datasets: [
                {
                    label: 'Medals',
                    data: sumOfAllMedalsYears,
                    backgroundColor: [
                        '#0b868f',
                        '#adc3de',
                        '#7a3c53',
                        '#8f6263',
                        'orange',
                        '#94819d',
                    ],
                    hoverOffset: 4,
                },
            ],
            responsiveRatio: {
                sm: 1.5,
                md: 1.5,
                lg: 2.5,
            },
        });
    }

    navigateToCountry(label: string): void {
        const id = this.olympicsData.find((i: Olympic) => i.country === label)?.id;
        this.router.navigate(['country', id]);
    }
}
