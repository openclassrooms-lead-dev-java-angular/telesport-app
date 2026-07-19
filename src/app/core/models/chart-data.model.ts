// src/app/core/models/chart-data.model.ts

export interface ChartData {
    labels: string[];
    datasets: ChartDataDataset[];
}

export interface ChartDataDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}