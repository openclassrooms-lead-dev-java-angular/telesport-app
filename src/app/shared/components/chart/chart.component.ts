import {
    afterNextRender,
    Component,
    ElementRef,
    input,
    OnDestroy,
    output,
    ViewChild,
} from '@angular/core';
import { ChartData, ResponsiveChartRatio } from 'src/app/core/models/chart-data.model';
import { ChartType } from 'src/app/core/enums/chart-type.enum';
import Chart, { ChartEvent } from 'chart.js/auto';

@Component({
    selector: 'app-chart',
    imports: [],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnDestroy {
    // properties
    data = input.required<ChartData>();
    clicked = output<string>();

    // attributes
    private chart!: Chart<ChartType, number[], string>;

    @ViewChild('Chart')
    private canvas!: ElementRef<HTMLCanvasElement>;

    constructor() {
        afterNextRender(() => {
            this.createChart();
        });
    }

    /**
     * Creates the chart
     * 
     * @returns void
     */
    private createChart(): void {
        if (!this.canvas) {
            return;
        }

        this.chart = new Chart(this.canvas.nativeElement, {
            type: this.data().type,
            data: {
                labels: this.data().labels,
                datasets: this.data().datasets,
            },
            options: {
                aspectRatio: this.getAspectRatio(this.data().responsiveRatio),
                responsive: true,
                maintainAspectRatio: true,
            },
        });

        if (this.clicked) {
            this.chart.options.onClick = (event) => {
                this.handleChartClick(event);
            }
        }
    }

    /**
     * Set up the click event
     * 
     * @param event
     * @returns void
     */
    private handleChartClick(event: ChartEvent) {
        if (!event.native) {
            return;
        }

        const points = this.chart.getElementsAtEventForMode(
            event.native,
            'point',
            { intersect: true },
            true
        );

        if (!points?.length) {
            return;
        }

        const label = this.chart.data.labels?.[points[0].index];

        if (typeof label === 'string') {
            this.clicked.emit(label);
        }
    }

    /**
     * Update chart aspect ratio 
     * @param responsiveRatio 
     * @returns number
     */
    private getAspectRatio(responsiveRatio: ResponsiveChartRatio | undefined): number {
        if (window.innerWidth <= 767) {
            return responsiveRatio?.sm || 1;
        }

        if (window.innerWidth <= 1199) {
            return responsiveRatio?.md || 1.25;
        }

        return responsiveRatio?.lg || 2.5;
    }

    ngOnDestroy(): void {
        this.chart?.destroy();
    }
}
