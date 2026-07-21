// src/app/core/models/olympic.model.ts

import { Participation } from "./participation.model";

export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}