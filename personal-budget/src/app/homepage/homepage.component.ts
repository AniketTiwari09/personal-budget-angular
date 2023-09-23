import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit ,AfterViewInit{

  public dataSource : any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56' ,
                '#ff6384' ,
                '#36a2eb'
            ],
        }
    ],
    labels: [

    ]
};
  constructor(private http: HttpClient)
  {}
  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
    }
    console.log(this.dataSource);
    this.createChart();
    });
  }

  ngOnInit(): void {


  }

  createChart() {


   // var ctx = document.getElementById("myChart").getContext('')
   //var ctx = document.getElementById("myChart")
   var canvas = document.getElementById('myChart') as HTMLCanvasElement;
   console.log(canvas);
   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;;

   var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
      }
    );
}

}
