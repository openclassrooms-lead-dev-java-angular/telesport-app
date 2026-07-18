import { afterNextRender, Component, ElementRef, input, OnDestroy, output, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData } from 'src/app/core/models/chart-data.model';

@Component({
    selector: 'app-pie-chart',
    imports: [],
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss',
    standalone: true
})
export class PieChartComponent implements OnDestroy {

    // properties
    data = input.required<ChartData>();
    onClick = output<string>();

    // attributes
    private pieChart!: Chart<"pie", number[], string>

    @ViewChild('PieChart')
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

        this.pieChart = new Chart(
            this.canvas.nativeElement, {
            type: 'pie',
            data: {
                labels: this.data().labels,
                datasets: [
                    {
                        label: 'Medals',
                        data: this.data().datasets[0].data,
                        backgroundColor: this.data().datasets[0].backgroundColor,
                        hoverOffset: this.data().datasets[0].hoverOffset
                    }
                ]
            },
            options: {
                aspectRatio: this.getAspectRatio(),
                responsive: true,
                maintainAspectRatio: true,
                onClick: (e) => {
                    if (e.native) {
                        const points = this.pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
                        if (points?.length) {
                            const firstPoint = points[0];
                            const label = this.pieChart.data.labels?.[firstPoint.index] as string;
                            this.onClick.emit(label);
                        }
                    }
                }
            }
        });
    }

    getAspectRatio(): number {
        if (window.innerWidth <= 767) {
            return 1;
        }

        if (window.innerWidth <= 1199) {
            return 1.25;
        }

        return 2.5;
    }

    ngOnDestroy(): void {
        this.pieChart?.destroy();
    }
}
