import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalDashboardComponent } from './medal-dashboard.component';

describe('HomeComponent', () => {
    let component: MedalDashboardComponent;
    let fixture: ComponentFixture<MedalDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedalDashboardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MedalDashboardComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
