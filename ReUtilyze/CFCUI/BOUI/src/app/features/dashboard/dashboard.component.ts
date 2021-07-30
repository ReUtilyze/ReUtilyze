import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { GetDashboardDataService } from './../../services/get-dasboarddata/get-dashboard-data.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  TotalPending : any;
  TotalApproved : any;
  TotalRejectedByBO : any;
  TotalRejectedByVendor : any;
  TotalCount : any;
  StatusData : any;
  boPendingCount : any;
  vendorPendingCount : any;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartColors: any[] = [
    { 
       

    }];
    public piechartColors: any[] = [
      { 
        backgroundColor:[ "#ffc107", "#198754","#dc3545"] 
  
      }];

      // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Pending',  'Approved', 'Rejected'];
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Approved' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Rejected' }
  ];

  GotoDetails(filter : string)
  {
    alert(filter);
  }
  constructor(private getDashboardDataService : GetDashboardDataService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
     
    this.getDashboardDataService.getData()
    .subscribe(
res => {
    console.log(res);
    console.log(res);
    this.StatusData  = res;
    this.TotalPending =0;
    this.TotalCount = 0;
    this.TotalApproved =0;
    this.TotalRejectedByBO =0;
    this.TotalRejectedByVendor =0;
    this.boPendingCount =0;
    this.vendorPendingCount = 0;
    this.StatusData.forEach(element => {
      this.TotalCount = this.TotalCount +  element.Count;
      if(element.Status === 'Submitted' || element.Status === 'Approved By BO' )
      {
        this.TotalPending  = this.TotalPending + element.Count;
      }
      if(element.Status === 'Approved By Vendor' )
      {
        this.TotalApproved  = this.TotalApproved + element.Count;
      }
      if(element.Status === 'Rejected By BO' )
      {
        this.TotalRejectedByBO  = this.TotalRejectedByBO + element.Count;
      }
      if(element.Status === 'Rejected By Vendor' )
      {
        this.TotalRejectedByVendor  = this.TotalRejectedByVendor + element.Count;
      }
      if(element.Status ==='Submitted')
       {
          var count =this.StatusData["Status"] === "Submitted" ;
        this.boPendingCount = element.Count;
       }
       if(element.Status ==='Approved By BO')
       {
        this.vendorPendingCount = element.Count;
       }
         

       
        
      
      
      
    });
    console.log(this.TotalPending);
    console.log(this.TotalCount);
    console.log(this.TotalApproved);
    console.log(this.TotalRejectedByBO);
    console.log(this.TotalRejectedByVendor);
    console.log(this.boPendingCount);
    this.pieChartData = [this.TotalPending, this.TotalApproved, this.TotalRejectedByBO + this.TotalRejectedByVendor];
},error => console.log(error));
  }

}
