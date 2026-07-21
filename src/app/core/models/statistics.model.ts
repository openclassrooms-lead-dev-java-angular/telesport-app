// src/app/core/models/country.model.ts

export interface CountryStats {
    entries: Stat;
    medals: Stat;
    athletes: Stat;
}

export interface Stat {
    title: string;
    value: number;
}
