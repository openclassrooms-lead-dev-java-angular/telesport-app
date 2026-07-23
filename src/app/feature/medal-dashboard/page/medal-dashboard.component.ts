import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PageTitleComponent } from 'src/app/shared/components/page-title/page-title.component';
import { StatisticCardComponent } from 'src/app/shared/components/statistic-card/statistic-card.component';
import { PieChartData } from 'src/app/core/models/chart-data.model';
import { ChartType } from 'src/app/core/enums/chart-type.enum';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { Country } from 'src/app/core/models/country.model';
import { MedalDashboardService } from 'src/app/feature/medal-dashboard/services/medal-dashboard.service';

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
    private olympicsData: Country[] = [];

    // contructor
    private olympicService = inject(OlympicService);
    private router = inject(Router);
    private mdService = inject(MedalDashboardService);

    ngOnInit() {
        this.olympicService
            .fetchCountries()
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (data) => {
                    this.olympicsData = data;
                    const { totalCountries, totalJOs } = this.mdService.extractStatistics(data);

                    this.totalCountries.set(totalCountries);
                    this.totalJOs.set(totalJOs);

                    this.chartData.set(this.mdService.buildPieChartDatas(data));
                },
                error: (error) => {
                    this.error.set(
                        'Oops! Even champions need a break sometimes.The data failed to load—please try again in a moment.'
                    );
                    console.error(error.message);
                },
            });
    }

    /**
     * Navigation callback for chart click action
     * 
     * @param label 
     */
    public navigateToCountry(label: string): void {
        const id = this.mdService.findCountryIdByName(this.olympicsData, label);
        this.router.navigate(['country', id]);
    }
}
