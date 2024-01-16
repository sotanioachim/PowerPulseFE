import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { Measurement } from 'src/app/models/measurement.model';
import { MeasurementService } from 'src/app/services/measurement.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as Highcharts from 'highcharts';
declare const require: any;
require('highcharts/modules/xrange')(Highcharts);

@Component({
  selector: 'app-measurement-stats',
  templateUrl: './measurement-stats.component.html',
  styleUrls: ['./measurement-stats.component.css']
})
export class MeasurementStatsComponent implements OnInit{

  public measurements!: Measurement[];
  public initialDate!: Date;
  public initialDateString!: string;
  public hourlyConsumption: number[] = [];

  displayedColumns: string[] = ['measurementId', 'deviceId', 'timestamp', 'consumption'];

  constructor(private _measurementService:MeasurementService){ 
    this.initialDate = new Date();
    const formattedDate = this.initialDate.toLocaleDateString();
    const reformatedDate = this.convertDateFormat(formattedDate);
    this.initialDateString = reformatedDate;
  }

  ngOnInit(): void {
     this._measurementService.getMeasurementsByDate(this.initialDateString).subscribe((res)=>{
        this.measurements = res
        .map((measurement) => ({
          ...measurement,
          hourlyConsumption: measurement.hourlyConsumption !== undefined ? +measurement.hourlyConsumption.toFixed(2) : undefined,
        }))
    });
    this.computeConsumption();
  }

  dateChange($event: any){
    const date = new Date($event.target.value);
    this.initialDate = date;
    const formattedDate = date.toLocaleDateString();
    const reformatedDate = this.convertDateFormat(formattedDate);
    this.lineChart.ref$.subscribe(chart => {
      while (chart.series.length > 0) {
        chart.series[0].remove(true); // Remove the first series
      }
    });
    this._measurementService.getMeasurementsByDate(reformatedDate).subscribe((res)=>{
      this.measurements = res
      this.computeConsumption();
    });
    this.hourlyConsumption = [];
  } 

  convertDateFormat(inputDate: string): string {
    // Parse the input date string
    const parts = inputDate.split('/');
    
    // Ensure the parts array has three elements (month, day, year)
    if (parts.length === 3) {
      // Convert to the desired format
      const year = parts[2];
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
  
      // Format the date as "YYYY-M-D"
      return `${year}-${month}-${day}`;
    } else {
      // Handle invalid date format
      return 'Invalid Date Format';
    }
  }

  computeConsumption(){
    for (let i = 0; i <= 23; i++) {
      let minDate = new Date(this.initialDate);
      minDate.setHours(i,0,0,0);
      let maxDate = new Date(this.initialDate);
      maxDate.setHours(i+1,0,0,0);
      let consumption = this.getMediumConsumptionPerHour(minDate,maxDate);
      this.hourlyConsumption.push(consumption);
    }
    console.log(this.hourlyConsumption);
    const seriesOptions: Highcharts.SeriesLineOptions = {
      name: 'Device 1',
      data: this.hourlyConsumption.map((value, index) => ({
        x: index, // Assuming you want the x-axis to be the index of the hour
        y: +value.toFixed(2),
      })),
      type: 'line',
    };
  
    // Add the series to the chart
    this.lineChart.addSeries(seriesOptions, true, true);
  }

  getMediumConsumptionPerHour (min:Date, max: Date): number{
    
    let filteredMeasurements = this.measurements.filter(measurement =>{
      return new Date(measurement.timestamp) >= min && new Date(measurement.timestamp) <= max
    });

    if (filteredMeasurements.length > 0) {
      const totalConsumption = filteredMeasurements.reduce((sum, measurement) =>
        sum + (measurement.hourlyConsumption !== undefined ? measurement.hourlyConsumption : 0), 0);


      return totalConsumption / filteredMeasurements.length;
    } else {
      // Handle case where there are no measurements in the specified date range
      return 0; // Or any default value you prefer
    }
  }

  public now = new Date();
  public startOfDay = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 0, 0, 0);
  public endOfDay = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 23, 59, 59);

  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Devices measurements'
    },
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      categories:["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    },
    yAxis: {
      title: {
        text: 'Consumption (W/h)'
      }
    },
  })
}
