import { Component, input } from '@angular/core';

@Component({
    selector: 'app-statistic-card',
    imports: [],
    templateUrl: './statistic-card.component.html',
    styleUrl: './statistic-card.component.scss',
    standalone: true,
})
export class StatisticCardComponent {
    cardTitle = input.required<string>();
    cardValue = input.required<number>();
}
