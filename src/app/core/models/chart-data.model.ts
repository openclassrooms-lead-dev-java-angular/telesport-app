// src/app/core/models/chart-data.model.ts

import { ChartType } from '../enums/chart-type.enum';

interface BaseChartDataset {
    label: string;
    data: number[];
}

interface BaseChartData<T extends BaseChartDataset> {
    labels: string[];
    datasets: T[];
    responsiveRatio?: ResponsiveChartRatio;
}

export type ChartData =
    | PieChartData
    | LineChartData;

export type ChartDataset =
    | PieChartDataset
    | LineChartDataset

// Pie chart
export interface PieChartDataset extends BaseChartDataset {
    hoverOffset: number;
    backgroundColor: string[];
}

export interface PieChartData extends BaseChartData<PieChartDataset> {
    type: ChartType.PIE;
}

export interface PieChartDataset extends BaseChartDataset {
    hoverOffset: number;
    backgroundColor: string[];
}

// Line chart
export interface LineChartDataset extends BaseChartDataset {
    backgroundColor: string;
}

export interface LineChartData extends BaseChartData<LineChartDataset> {
    type: ChartType.LINE;
}

export interface LineChartDataset extends BaseChartDataset {
    backgroundColor: string;
}

export interface ResponsiveChartRatio {
    sm: number;
    md: number;
    lg: number;
}
