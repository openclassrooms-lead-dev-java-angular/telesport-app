import { Injectable } from "@angular/core";
import { ChartType } from "src/app/core/enums/chart-type.enum";
import { LineChartData } from "src/app/core/models/chart-data.model";
import { Country } from "src/app/core/models/country.model";
import { Participation } from "src/app/core/models/participation.model";

@Injectable({
    providedIn: 'root',
})
export class CountryDetailService {

    /**
     * Extract medals
     * 
     * @param country: Country
     * @returns Number[] 
     */
    buildMedals(country: Country): number[] {
        return country.participations.map((i: Participation) => i.medalsCount) ?? [];
    }

    /**
     * Extract statistics values
     * 
     * @param country: Country
     * @param medals: number
     * @returns { athletes: number, medalsCount: number, entries: number }
     */
    buildStatistics(country: Country, medals: number[]): { athletes: number, medalsCount: number, entries: number } {
        const nbAthletes: number[] = country.participations.map(
            (i: Participation) => i.athleteCount
        );

        return {
            athletes: nbAthletes.reduce((acc: number, item: number) => acc + item, 0),
            medalsCount: medals.reduce((acc: number, item: number) => acc + item, 0),
            entries: country.participations.length ?? 0
        };
    }

    /**
     * Build datas for chart
     * 
     * @param country: Country 
     * @param medals: number
     * @returns LineChartData
     */
    buildChartData(country: Country, medals: number[]): LineChartData { //TODO: add medals): LineChartData {
        const years = country.participations.map((i: Participation) => i.year.toString());

        return {
            type: ChartType.LINE,
            labels: years,
            datasets: [
                {
                    label: 'medals',
                    data: medals,
                    backgroundColor: '#0b868f',
                },
            ],
            responsiveRatio: {
                sm: 2,
                md: 2,
                lg: 2.5,
            },
        };
    }
}