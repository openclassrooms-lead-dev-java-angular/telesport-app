import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCardComponent } from './statistic-card.component';

describe('StatisticCardComponent', () => {
    let component: StatisticCardComponent;
    let fixture: ComponentFixture<StatisticCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StatisticCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StatisticCardComponent);

        fixture.componentRef.setInput('cardTitle', 'France');
        fixture.componentRef.setInput('cardValue', '3');

        component = fixture.componentInstance;
        await fixture.whenStable();
    });



    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
