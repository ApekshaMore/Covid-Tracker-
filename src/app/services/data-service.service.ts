import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl= 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-30-2020.csv';
  private dateWiseDataUrl= 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  private globalDataApify = "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
  private globalDataTotalUrl = "https://covid19.mathdro.id/api";


  constructor(private http: HttpClient) { }

  getDateWiseData(){
    return this.http.get(this.dateWiseDataUrl,{ responseType: 'text'})
    .pipe(map(result=>{
      let rows = result.split("\n");
      let mainData ={};
      let headder = rows[0];
      let dates = headder.split(/,(?=\S)/);
      dates.splice(0,4);
      rows.splice(0,1);
      rows.forEach(row=>{
        let cols=row.split(/,(?=\S)/);
        let con= cols[1];
        cols.splice(0,4);
        mainData[con] = [];
        cols.forEach((value , index)=>{
          let dw : DateWiseData = {
            cases : +value ,
            country : con , 
            date : new Date(Date.parse(dates[index])) 

          }
          mainData[con].push(dw)
        })
    })   
    console.log(mainData);
      return mainData;
    }))
  }

  getGlobalData(){
   return this.http.get(this.globalDataUrl,{responseType: 'text'}).pipe(
     map(result=>{
     
      let data: GlobalDataSummary[]=[];
      let raw = {}
      let rows= result.split('\n'); 
      rows.splice(0,1)//removing the values of0th index i.e column
      rows.forEach(rows=>{
      let cols=  rows.split(/,(?=\S)/);
     
      let cs={
        country : cols[3],
        confirmed : +cols[7],
        deaths : +cols[8],
        recovered : +cols[9],
        alive : +cols[10],
      }
      let temp: GlobalDataSummary =raw[cs.country];
      if(temp){
        temp.alive= cs.alive + temp.alive
        temp.confirmed= cs.confirmed + temp.confirmed
        temp.deaths= cs.deaths + temp.deaths
        temp.recovered= cs.recovered + temp.recovered
  
        raw[cs.country] = temp;
      }
      else{
        raw[cs.country]=cs;
      }
      })
    console.log(data);

      return <GlobalDataSummary[]>Object.values(raw) ;
     })
   )
 }
 getTotalCounts(): Observable<any> {
  return this.http.get(this.globalDataTotalUrl)
}

getCountryData(): Observable<any> {
  return this.http.get(this.globalDataApify)
}
  
}
