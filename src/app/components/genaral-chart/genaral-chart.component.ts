import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-genaral-chart',
  templateUrl: './genaral-chart.component.html',
  styleUrls: ['./genaral-chart.component.scss']
})
export class GenaralChartComponent implements OnDestroy, OnChanges {
  @Input() chartType: ChartType = 'bar';
  @Input() data: any[] = [];
  @Input() labels: string[] = [];
  @Input() customOptions: Partial<ChartOptions> = {};
  @Input() backgroundColorChoice: number[] = [1];
  @Input() borderColorChoice: number[] = [];
  @Input() optionsChoice: number = 1;
  @Input() fillChoice: boolean = false;
  @Input() legend: string[] = [];

  public chartData!: ChartData<'bar' | 'line' | 'doughnut'>;
  public chartOptions: ChartOptions = {};

  private colorSets: { [key: number]: string[] } = {
    1: ['#ec6b84', '#F9A455', '#E74363', '#6078d0'],
    2: ['#34A853', '#4285F4', '#FBBC05', '#EA4335'],
    3: ['#8E44AD', '#3498DB', '#E74C3C', '#2ECC71'],
    4: ['#E74C3C6B'],
    5: ['#FBBC058C'],
    6: ['#ec6b84'],
    7: ['#F9A455']
  };
  private borderSets: { [key: number]: string[] } = {
    1: ['#E1306CFF', '#F9A455', '#FBBC05', '#4285F4'],
  };

  private optionSets: { [key: number]: ChartOptions } = {
    1: { responsive: true,
      plugins: { legend: { display: true, position: 'top' } },
    },
    2: {
      responsive: true,
      plugins: { legend: { display: true, position: 'top' } },
      scales: { x: { display: true }, y: { beginAtZero: true } }
    },
    3: { responsive: true, plugins: { legend: { display: true, position: 'top' } } },
    4: {
      responsive: true,
      scales: {
        x: { grid: { display: true } },
        y: { beginAtZero: true, grid: { display: true } }
      },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw}`
          }
        }
      }
    },
    5: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
      plugins: { legend: { display: true, position: 'top' } }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.chartData = {
      labels: [],
      datasets: []
    };
    if (changes['data'] || changes['labels']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.chartData = {
      labels: this.labels,
      datasets: this.data.map((values, index) => ({
        label: this.legend[index],
        data: values,
        backgroundColor: this.colorSets[this.backgroundColorChoice[index]],
        borderColor: this.borderColorChoice[index]!=undefined?this.borderSets[this.borderColorChoice[index]]:"",
        borderWidth: this.borderColorChoice[index]!=undefined?1:0,
        fill: this.fillChoice,
        barThickness: this.chartType === 'bar' ? 15 : undefined,
        barPercentage: this.chartType === 'bar' ? 0.5 : undefined,
        borderRadius: this.chartType === 'bar' ? 10 : undefined,
        borderSkipped: this.chartType === 'bar' ? false : undefined,
        tension: this.chartType === 'line' ? 0.4 : undefined,
      }))
    };
    this.applyChartOptions();
  }

  private applyChartOptions(): void {
    this.chartOptions = { ...this.optionSets[this.optionsChoice],maintainAspectRatio: false, ...this.customOptions };
  }

  ngOnDestroy(): void {
    // No need to manually destroy the chart instance as ng2-charts handles it
  }
}
