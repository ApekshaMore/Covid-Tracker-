import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { CountryDataSummary } from 'src/app/models/country-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed=0
  totalActive=0
  totalRecovered=0
  totalDeath=0
  globalData : GlobalDataSummary[];
  countryData: CountryDataSummary[];

  datatable = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  constructor(private dataService : DataServiceService) { }

  initChart(caseType :String){
    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])
    
    this.globalData.forEach(cs => {
      let value :number ;
      if (caseType == 'c')
        if (cs.confirmed > 2000)
          value = cs.confirmed
          
      if (caseType == 'a')
        if (cs.alive > 2000)
          value = cs.alive
      if (caseType == 'd')
        if (cs.deaths > 1000)
          value = cs.deaths
          
      if (caseType == 'r')
        if (cs.recovered > 2000)
            value = cs.recovered
        

        this.datatable.push([
            cs.country, value
          ])
    })
    console.log(this.datatable);
  }

  
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  ngOnInit(): void {
   
    this.dataService.getGlobalData()
    .subscribe(
      {
        next :(result)=>{
          console.log(result);
          this.globalData=result;       
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.alive
              this.totalConfirmed+=cs.confirmed
              this.totalRecovered+= cs.recovered
              this.totalDeath += cs.deaths
            }
          })
          this.initChart('c');
        },  
      }
    )
  }

}



