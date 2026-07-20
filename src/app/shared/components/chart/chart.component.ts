import { afterNextRender, Component, ElementRef, input, OnDestroy, output, ViewChild } from '@angular/core';
import { ChartData, ResponsiveChartRatio } from 'src/app/core/models/chart-data.model';
import { ChartType } from 'src/app/core/enums/chart-type.enum';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-chart',
    imports: [],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnDestroy {

    // properties
    data = input.required<ChartData>();
    onClick = output<string>();

    // attributes
    private chart!: Chart<ChartType, number[], string>

    @ViewChild('Chart')
    private canvas!: ElementRef<HTMLCanvasElement>;

    constructor() {
        afterNextRender(() => {
            this.createChart();
        });
    }

    createChart(): void {

        if (!this.canvas) {
            return
        }

        this.chart = new Chart(
            this.canvas.nativeElement, {
            type: this.data().type,
            data: {
                labels: this.data().labels,
                datasets: this.data().datasets,
            },
            options: {
                aspectRatio: this.getAspectRatio(this.data().responsiveRatio),
                responsive: true,
                maintainAspectRatio: true,
            }
        });
        
        if (this.onClick) {
            this.chart.options.onClick = (e) => {
                if (e.native) {
                    const points = this.chart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
                    if (points?.length) {
                        const firstPoint = points[0];
                        const label = this.chart.data.labels?.[firstPoint.index] as string;
                        this.onClick.emit(label);
                    }
                }
            }
        }
    }

    getAspectRatio(responsiveRatio: ResponsiveChartRatio | undefined): number {
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
