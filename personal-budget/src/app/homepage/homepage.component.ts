/* import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb'],
      },
    ],
    labels: [],
  };
  ngOnInit(): void{
    this.dataService.fetchData();
  }
  constructor(private http: HttpClient, private dataService: DataService) {}
  ngAfterViewInit(): void {
    this.dataService.data$.subscribe((data: any) => {
      console.log(data);
      for (var i = 0; i <  data.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = data.myBudget[i].budget;
        this.dataSource.labels[i] = data.myBudget[i].title;
      }
      this.createChart(this.dataSource);
    });
  }

  createChart(data: any) {
    // var ctx = document.getElementById("myChart").getContext('')
    //var ctx = document.getElementById("myChart")
    var canvas = document.getElementById('myChart') as HTMLCanvasElement;
    console.log(canvas);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });
  }
}

*/


/*import { Component, OnInit, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit{

  public dataSource : any = {
    datasets: [
        {
            data: [
              {
                "title": "Eat out",
                "budget": 50
              },
              {
                "title": "Rent",
                "budget": 200
              },
              {
                "title": "Grocery",
                "budget": 90
              },
              {
                "title": "Dog",
                "budget": 50
              },
              {
                "title": "Entertainment",
                "budget": 200
              },
              {
                "title": "Office",
                "budget": 50
              },
              {
                "title": "Motorcycle",
                "budget": 400
              }
            ],
            backgroundColor: [
                '#ffcd56' ,
                '#ff6384' ,
                '#36a2eb' ,
                '#fd6b19' ,
            ],
        }
    ],
    labels: [

    ]
};
  constructor(private el: ElementRef, private ngZone: NgZone, private http: HttpClient)
  {

  }

  ngAfterViewInit(): void {


    this.http.get('http://localhost:4000/budget')
    .subscribe((res: any) => {

      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
    }

    });

  }

  createChart() {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}*/

import { Component, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { Chart } from 'chart.js';
import * as d3 from 'd3'; // Import D3 library


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#cc65fe',
          '#fcba03',
          '#fd6b19',
        ],
      },
    ],
    labels: [],
  };

  constructor(private el: ElementRef, private ngZone: NgZone) {}



  ngAfterViewInit(): void {
    const data = [
      {
        title: 'Eat out',
        budget: 50,
      },
      {
        title: 'Rent',
        budget: 200,
      },
      {
        title: 'Grocery',
        budget: 90,
      },
      {
        title: 'Dog',
        budget: 50,
      },
      {
        title: 'Entertainment',
        budget: 200,
      },
      {
        title: 'Office',
        budget: 50,
      },
      {
        title: 'Motorcycle',
        budget: 400,
      },
    ];

    for (let i = 0; i < data.length; i++) {
      this.dataSource.datasets[0].data[i] = data[i].budget;
      this.dataSource.labels[i] = data[i].title;
    }

    this.createChart();
    this.createD3Chart(data); // Call the function to create the D3 chart
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  createD3Chart(data: any[]) {
    // Create a D3 bar chart using the provided data
    const svgWidth = 400;
    const svgHeight = 300;
    const barPadding = 5;
    const barWidth = svgWidth / data.length;

    const svg = d3.select('#d3Chart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.budget)])
      .range([0, svgHeight]);

    const barChart = svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d) => svgHeight - yScale(d.budget))
      .attr('height', (d) => yScale(d.budget))
      .attr('width', barWidth - barPadding)
      .attr('transform', (d, i) => `translate(${i * barWidth}, 0)`);
  }
}


