import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-bart',
  templateUrl: './chart-bart.component.html',
  styleUrls: ['./chart-bart.component.css']
})
export class ChartBartComponent implements OnInit {

  
  single= [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "Argentina",
      "value": 2000000
    }    
  ];
  
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoría';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };  

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
