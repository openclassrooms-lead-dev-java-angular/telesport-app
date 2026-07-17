import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-statistic-card',
    imports: [],
    templateUrl: './statistic-card.component.html',
    styleUrl: './statistic-card.component.scss',
    standalone: true
})
export class StatisticCardComponent {
    @Input() cardTitle: string = '';
    @Input() cardValue: number = 0;
}
