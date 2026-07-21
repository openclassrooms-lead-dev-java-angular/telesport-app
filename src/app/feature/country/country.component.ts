import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Participation } from 'src/app/core/models/participation.model';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PageTitleComponent } from "src/app/shared/components/page-title/page-title.component";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { LineChartData } from 'src/app/core/models/chart-data.model';
import { ChartType } from 'src/app/core/enums/chart-type.enum';
import { CountryStats, Stat } from 'src/app/core/models/statistics.model';
import { StatisticCardComponent } from "src/app/shared/components/statistic-card/statistic-card.component";
import { finalize } from 'rxjs';
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Component({
    selector: 'app-country',
    imports: [
        PageTitleComponent,
        ButtonComponent,
        ChartComponent,
        StatisticCardComponent,
        SpinnerComponent
    ],
    templateUrl: './country.component.html',
    styleUrl: './country.component.scss',
    standalone: true
})
export class CountryComponent implements OnInit {

    // attributes
    public pageTitle: string = '';
    private stats: CountryStats = {
        entries: {
            title: 'Number of entries',
            value: 0,
        },
        medals: {
            title: 'Total Number of medals',
            value: 0
        },
        athletes: {
            title: 'Total Number of athletes',
            value: 0
        }
    };
    private medals: number[] = [];
    public error = signal('');
    protected chartData = signal<LineChartData>({
        type: ChartType.LINE,
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: '',
        }],
        responsiveRatio: {
            sm: 0,
            md: 0,
            lg: 0
        }
    });
    public isLoading = signal(true);

    // constructors
    private route: ActivatedRoute = inject(ActivatedRoute);
    private olympicService = inject(OlympicService);

    ngOnInit(): void {
        let countryName: string | null = null;
        this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));

        if (!countryName) {
            this.error.set('Sory, no country name no stats.');
            return;
        }

        this.olympicService.fetchOlympics()
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (data) => {
                    const selectedCountry = data.find((olympic: Olympic) => olympic.country === countryName);

                    if (!selectedCountry) {
                        this.error.set(`Sory but country "${countryName}" does not exists in our database.`);
                        return;
                    }

                    this.updateStatistics(selectedCountry);
                    this.buildChart(selectedCountry);
                },
                error: (error) => {
                    this.error.set('Oops! Even champions need a break sometimes.The data failed to load—please try again in a moment.');
                    console.error(error.message);
                },

            })
    }

    updateStatistics(country: Olympic): void {
        this.pageTitle = country.country;
        this.medals = country.participations.map((i: Participation) => i.medalsCount) ?? [];
        this.stats.entries.value = country.participations.length ?? 0;

        this.stats.medals.value = this.medals.reduce((acc: number, item: number) => acc + item, 0);

        const nbAthletes: number[] = country.participations.map((i: Participation) => i.athleteCount);
        this.stats.athletes.value = nbAthletes.reduce((acc: number, item: number) => acc + item, 0);
    }

    buildChart(country: Olympic) {
        const years = country.participations.map((i: Participation) => i.year.toString());

        this.chartData.set({
            type: ChartType.LINE,
            labels: years,
            datasets: [
                {
                    label: "medals",
                    data: this.medals,
                    backgroundColor: '#0b868f',
                },
            ],
            responsiveRatio: {
                sm: 2,
                md: 2,
                lg: 2.5
            }
        })
    }

    public statsList(): Stat[] {
        return Object.values(this.stats);
    }
}
