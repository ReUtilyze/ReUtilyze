import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GetClaimRequestDataService } from './../../services/get-claimrequestdata/get-claim-request-data.service';
import { PaginationService } from './../../services/pagination/pagination.service';
import { recycleRequest } from './../../_models/recycleRequest.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-claimrequestlist',
  templateUrl: './claimrequestlist.component.html',
  styleUrls: ['./claimrequestlist.component.css']
})
export class ClaimrequestlistComponent implements OnInit {
  CommandType: any;
  searchForm: FormGroup;
  minDate : Date;
  page = 1;
  count = 0;
  tableSize = 10;
  search_options : any;
  tableSizeOptions = [10, 25, 50, 100];
  searchUrl =  environment.apiUrl + 'Request/GetRequests' ;
  requests : any;
  currentPageRange : any;
  RequestData : recycleRequest[] =[];
  statusFilterQuery : string = '';
  fromDateFilterQuery : string = '';
  toDateFilterQuery : string = '';
  constructor( private route: ActivatedRoute,
    private paginationService : PaginationService,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
     private getClaimRequestDataService : GetClaimRequestDataService,
     private router: Router  
     ) { }

  ngOnInit(): void {


    this.searchForm = this._fb.group({
      searchStatus: [''],
      fromDateFilter: [''],
      toDateFilter: ['']
    })


    this.search_options=[
      {id:'0', value: 'Select Status'},
      {id:'Submitted', value: 'Pending for BO Approval'},
      // {id:'Pending for BO Approval', value: 'Pending for BO Approval'},
      {id:'Approved By BO', value: 'Pending for Vendor Approval'},
      {id:'Approved By BO', value: 'Approved By BO'},
      {id:'Approved By Vendor', value: 'Approved By Vendor'},
      {id:'Rejected By BO', value: 'Rejected By BO'},
      {id:'Rejected By Vendor', value: 'Rejected By Vendor'},
      {id:'Total Requests', value: 'Total Requests'}

    ];

    this.CommandType = this.route.snapshot.paramMap.get('CommandType');
    this.route.paramMap
    .subscribe(
      (param:any) =>{
        var commandType = param.get('CommandType');
        this.CommandType = commandType.replace('%20',' ');
        if(this.CommandType){
          this.searchForm.patchValue({ searchStatus: this.CommandType})
          this.statusFilterQuery = this.CommandType ? '?status=' + this.CommandType : '';
          this.searchUrl = environment.apiUrl + 'Request/GetRequests' + this.statusFilterQuery + this.fromDateFilterQuery+ this.toDateFilterQuery;
          console.log(this.searchUrl);
            this.getSearchData(this.searchUrl);
        }
      }
    )
  }

  tabSize(event){
    this.page = event;
    this.searchUrl =  environment.apiUrl + 'Request/GetRequests' ;
    this.getSearchData(this.searchUrl);
  }
  
  filterSearch(formData): void {
    let status = formData.searchStatus;
    let fromDate = this.datePipe.transform('1970-01-01', 'YYYY-MM-ddT00:00:00.000');
    if(formData.fromDateFilter){
      fromDate = this.datePipe.transform(formData.fromDateFilter, 'YYYY-MM-ddT00:00:00.000');
    }
    let toDate = this.datePipe.transform(new Date(), 'YYYY-MM-ddT00:00:00.000');
    if(formData.toDateFilter){
      toDate = this.datePipe.transform(formData.toDateFilter, 'YYYY-MM-ddT00:00:00.000');
    }
    if(status != 'Total Requests' ) {this.statusFilterQuery =  status ? '&status=' + status : '';} 
    else { this.statusFilterQuery = ''   }

    this.fromDateFilterQuery = fromDate ? '&FromDate=' + fromDate : '';
    this.toDateFilterQuery = toDate ? '&ToDate=' + toDate : '';
    this.page = 1;
    this.searchUrl = environment.apiUrl + 'Request/GetRequests?a=1' + this.statusFilterQuery + this.fromDateFilterQuery+ this.toDateFilterQuery;
    console.log(this.searchUrl);
    this.getSearchData(this.searchUrl);
  
  }  

  onPageSizeChange(event): void{
    this.page = 1;
    this.tableSize = event.target.value;
    this.searchUrl = environment.apiUrl + 'Request/GetRequests' ;
    console.log(this.searchUrl);
    this.searchUrl = environment.apiUrl + 'Request/GetRequests?a=1' + this.statusFilterQuery + this.fromDateFilterQuery+ this.toDateFilterQuery;
  }

  getSearchData(url: string): void{
    this.paginationService.fetchPosts(url)
    .subscribe(
      res => {
        debugger
        this.requests = res;
        this.count = res.length;
        let resultLength = 10;
        let offset = (this.page - 1) * this.tableSize + 1;
        let pageEnd = offset + (resultLength - 1);
        this.currentPageRange = offset + '-' + pageEnd;
    });
  }

  onValueChange(event){
    this.minDate = event;
    this.searchForm.patchValue({ toDateFilter: '' });
  }

  GotoDashboard(){
    this.router.navigate(['/dashboard']);

  }

}
