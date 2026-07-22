import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChartEvent } from 'chart.js';
import { ChartType } from 'src/app/core/enums/chart-type.enum';
import { ActiveElement, Chart } from 'chart.js';

describe('ChartComponent', () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChartComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    const chartMock = {
        data: {
            labels: ['France', 'Italie', 'Espagne'],
            datasets: [{
                label: 'Medals',
                data: [1, 2, 3],
                backgroundColor: [
                    '#0b868f',
                    '#adc3de',
                    '#7a3c53',
                ],
                hoverOffset: 4
            }]
        },

        getElementsAtEventForMode: jasmine
            .createSpy()
            .and.returnValue([
                {
                    index: 1
                } as ActiveElement
            ]),

        options: {}
    } as unknown as Chart<ChartType, number[], string>;

    const responsiveRatio = {
        sm: 1,
        md: 2,
        lg: 3
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return sm ratio on mobile', () => {
        spyOnProperty(window, 'innerWidth').and.returnValue(400);

        const ratio = component.getAspectRatio(responsiveRatio);

        expect(ratio).toBe(1);
    })

    it('should return default desktop ratio', () => {

        spyOnProperty(window, 'innerWidth').and.returnValue(1600);

        expect(component.getAspectRatio(undefined))
            .toBe(2.5);

    });

    it('should emit clicked label when clicking on chart point', () => {
        component['chart'] = chartMock;

        spyOn(component.clicked, 'emit');

        component.createChart();

        component['chart'].options.onClick = (event) => {

            const points = component['chart']
                .getElementsAtEventForMode(
                    event.native!,
                    'point',
                    { intersect: true },
                    true
                );

            if (points.length) {
                const label = component['chart']
                    .data
                    .labels?.[points[0].index] as string;

                component.clicked.emit(label);
            }
        };

        const clickEvent: ChartEvent = {
            type: 'click',
            x: 100,
            y: 100,
            native: new MouseEvent('click')
        };


        component['chart'].options.onClick(
            clickEvent,
            [],
            component['chart']
        );


        expect(component.clicked.emit)
            .toHaveBeenCalledWith('Février');

    })
});
