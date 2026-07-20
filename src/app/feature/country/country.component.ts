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

@Component({
    selector: 'app-country',
    imports: [
        PageTitleComponent,
        ButtonComponent,
        ChartComponent,
        StatisticCardComponent
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
    public error!: string;
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

    // constructors
    private route: ActivatedRoute = inject(ActivatedRoute);
    private olympicService = inject(OlympicService);

    ngOnInit(): void {
        let countryName: string | null = null;
        this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));

        if (!countryName) {
            throw new Error('Country name not found');
        }

        this.olympicService.fetchOlympics().subscribe(data => {
            const selectedCountry = data.find((olympic: Olympic) => olympic.country === countryName);

            if (!selectedCountry) {
                throw new Error('Country not found');
            }

            this.updateStatistics(selectedCountry);
            this.buildChart(selectedCountry);
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
                sm: 1.5,
                md: 1,
                lg: 2.5
            }
        })
    }

    public statsList(): Stat[] {
        return Object.values(this.stats);
    }
}
