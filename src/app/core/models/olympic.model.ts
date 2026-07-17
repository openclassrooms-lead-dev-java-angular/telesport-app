// src/app/core/models/olympic.model.ts

import { Participation } from "./participation.model";

export class Olympic {
    id: number = 0;
    country: string = '';
    participations: Participation[] = [];
}