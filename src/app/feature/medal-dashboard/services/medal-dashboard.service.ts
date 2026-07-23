import { Injectable } from "@angular/core";
import { ChartType } from "src/app/core/enums/chart-type.enum";
import { PieChartData } from "src/app/core/models/chart-data.model";
import { Country } from "src/app/core/models/country.model";
import { Participation } from "src/app/core/models/participation.model";


@Injectable({
    providedIn: 'root',
})
export class MedalDashboardService {

    public extractStatistics(data: Country[]): { totalCountries: number, totalJOs: number } {
        return {
            totalCountries: data.length,
            totalJOs: Array.from(
                new Set(
                    data
                        .map((i: Country) => i.participations.map((f: Participation) => f.year))
                        .flat()
                )
            ).length
        }
    }

    /**
     * Build pie chart datas
     * 
     * @param data 
     */
    public buildPieChartDatas(data: Country[]): PieChartData {
        const countries: string[] = data.map((i: Country) => i.country);
        const medals: number[][] = data.map((i: Country) =>
            i.participations.map((i: Participation) => i.medalsCount)
        );
        const sumOfAllMedalsYears = medals.map((i) =>
            i.reduce((acc: number, i: number) => acc + i, 0)
        );

        return {
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
        };
    }

    findCountryIdByName(countries: Country[], countryName: string): number | undefined {
        return countries.find((i: Country) => i.country === countryName)?.id;
    }
}