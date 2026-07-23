// src/app/core/models/country.model.ts

import { Participation } from './participation.model';

export interface Country {
    id: number;
    country: string;
    participations: Participation[];
}
