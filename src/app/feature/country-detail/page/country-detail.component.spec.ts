import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailComponent } from './country-detail.component';
import { provideRouter } from '@angular/router';

describe('CountryComponent', () => {
    let component: CountryDetailComponent;
    let fixture: ComponentFixture<CountryDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CountryDetailComponent],
            providers: [
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CountryDetailComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
