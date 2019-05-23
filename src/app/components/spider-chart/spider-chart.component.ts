import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.css']
})
export class SpiderChartComponent implements OnInit, AfterViewInit {

  @Input() data;
  @Input() elementId: string;
  public canvas;
  public ctx;
  public spiderChart;
  public chartData;
  public options;
  public changes;

  constructor() { }

  ngOnInit() {

    this.chartData = {
      labels: this.data[0],
      datasets: [{
        data: this.data[1]
      }]
    };

    this.options = {
    };

  }

  ngAfterViewInit() {
    if (this.canvas === undefined) {
    this.canvas = document.getElementById(this.elementId);
    }
    if (this.canvas === undefined) {
      console.log('null');
      return;
    }
    console.log('data', this.data);
    this.ctx = this.canvas.getContext('2d');
    this.createChart();
  }

  createChart() {

    this.spiderChart = new Chart(this.ctx, {
        type: 'radar',
        data: {
            labels: this.data[0],
            datasets: [{
                label: 'Survey Result',
                data: this.data[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)'
                ],
                borderColor: [
                    'rgba(155, 99, 132, 1)',
                    'rgba(254, 162, 235, 1)',
                    'rgba(75, 206, 86, 1)',
                    'rgba(125, 192, 192, 1)',
                    'rgba(193, 102, 255, 1)',
                    'rgba(195, 179, 64, 1)'
                ],
                borderWidth: 2
            },
            {
              label: 'Generated Result',
              data: this.data[2],
              backgroundColor: [
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                  'rgba(255, 99, 132, 0.4)',
                  'rgba(54, 162, 235, 0.4)',
                  'rgba(255, 206, 86, 0.4)'

              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
    });
    console.log('chart', this.spiderChart, this.chartData, this.options);
  }

  // ngOnChanges(changes) {
  //   this.changes = changes;
  //   console.log('change', changes);
  //   if (changes && changes.data && !changes.firstChange) {
  //     this.spiderChart.data = {
  //       labels: changes.data.currentValue[0],
  //       datasets: [{
  //         data: changes.data.currentValue[1]
  //       }]
  //     };
  //     this.spiderChart.update();
  //   }
  // }

  update() {
    if (this.spiderChart) {
      this.spiderChart.update();
      console.log(this.spiderChart);
    } else {
      console.log('empty');
    }
  }

}
