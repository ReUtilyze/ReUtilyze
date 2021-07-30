import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileExtensionPipe } from './../../_pipes/file-extension.pipe';
import { GetClaimRequestDataService } from 'src/app/services/get-claimrequestdata/get-claim-request-data.service';
import { DeliveryAddressOrPickupAddress, recycleRequestDetails } from 'src/app/_models/recyleRequestDetails';
import { environment } from 'src/environments/environment';
 import { approverejectdata } from './../../_models/approverejectdata';
 import { AuthService } from './../../services/auth/auth.service';
 import { ApproveRejectService } from './../../services/approve_reject/approve-reject.service';
@Component({
  selector: 'app-claimrequestdetails',
  templateUrl: './claimrequestdetails.component.html',
  styleUrls: ['./claimrequestdetails.component.css']
})
export class ClaimrequestdetailsComponent implements OnInit {

  requestID : string ='';
 RequestNumber : string ='';
 requestDate : string ='';
 requestedBy : string ='';
 emailId : string ='';
 status:  string ='';
 recycleRequestDetail : any;
 defects : any;
 category : string ='';
 brand : string ='';
 model : string ='';
 varient : string='';

 processor : string ='';
 ram : string ='';
 storage : string ='';
 batterycapacity : string ='';
 camera: string ='';
 vpn: string ='';
 maxrecyclevalue: string ='';
  tentativeRecycleValue : number =0;
 modelimage: string ='';
 transactionType : string ='';
 dispatchMode : string=''
  currentStep: string = 'step-1';
  currentId: number = 1;
  totalSteps:number = 1;
  estimatedPrice: number = 45000;
  shipmentType: string = 'pickup';
  showAddress: boolean = false;

  pickupAddress : DeliveryAddressOrPickupAddress;
  deliveryAddress : DeliveryAddressOrPickupAddress;

  DAddressLine1 : string=''
  DAddressLine2: string=''
  DCity: string=''
  DCountry: string=''
  DFullname: string=''
  DLandMark: string=''
  DPhoneNumber: string=''
  DState: string=''

  PAddressLine1 : string=''
  PAddressLine2: string=''
  PCity: string=''
  PCountry: string=''
  PFullname: string=''
  PLandMark: string=''
  PPhoneNumber: string=''
  PState: string=''
currentUserRole : string ='';
  uploadedImages : string[]=[];
  remarks : string ='';
  fileUrl : string ='';
  imageBaseURL : string =environment.imageURL;
  isFinalPriceEditable : boolean; 
  constructor(private router: Router,
    private route : ActivatedRoute,
    private  authService : AuthService, 
      private getClaimRequestDataService : GetClaimRequestDataService,
      private approveRejectService : ApproveRejectService
      ) { }

  ngOnInit(): void {
    

    this.route.paramMap
    .subscribe(
      (param:any) =>{
        
        this.requestID = param.get('id');
        if(this.requestID){
           
          this.getClaimRequestDataService.getData(this.requestID)
          .subscribe(
      res => {
         
          
          this.recycleRequestDetail = res;
          
          this.defects = this.recycleRequestDetail.Defects;
          this.category = this.defects[0].Varient.Model.Brand.Category.CategoryName
          this.transactionType = this.recycleRequestDetail.TransactionType;
          this.dispatchMode = this.recycleRequestDetail.DispatchMode;
          this.RequestNumber =this.recycleRequestDetail.RequestNo;
          this.requestDate =this.recycleRequestDetail.RequestDate.substr(0,10);
          this.requestedBy  =this.recycleRequestDetail.UserName;
          this.emailId  =this.recycleRequestDetail.UserEmailId;
          this.tentativeRecycleValue = this.recycleRequestDetail.TentativeRecycleValue;
          this.status = this.recycleRequestDetail.Status;
          this.brand= this.defects[0].Varient.Model.Brand.BrandName;
          this.model = this.recycleRequestDetail.Defects[0].Varient.Model.ModelName;
          this.varient = this.defects[0].Varient.VarientName;
          console.log(this.recycleRequestDetail);
          this.processor = this.defects[0].Varient.Processor;
          this.ram  = this.defects[0].Varient.RAM;
          this.storage  = this.defects[0].Varient.Storage;
          this.batterycapacity  = this.defects[0].Varient.BatteryCapacity;
          this.camera = this.defects[0].Varient.Camera;
          this.vpn = this.defects[0].Varient.VPN;
          this.maxrecyclevalue = this.defects[0].Varient.MaxRecycleValue;

          this.modelimage =  this.recycleRequestDetail.Defects[0].Varient.Model.ModelImageName;
          let modelPicupAdd = new DeliveryAddressOrPickupAddress();
          Object.assign(modelPicupAdd, this.recycleRequestDetail.PickupAddress);
          console.log(modelPicupAdd);
          this.pickupAddress = modelPicupAdd;
          let modelDropAdd  = new DeliveryAddressOrPickupAddress();
          Object.assign(modelDropAdd, this.recycleRequestDetail.DeliveryAddress);
          console.log(modelDropAdd);
          this.deliveryAddress = modelDropAdd  ;
          this.DAddressLine1 = this.deliveryAddress.AddressLine1;
          this.DAddressLine2= this.deliveryAddress.AddressLine2;
          this.DCity= this.deliveryAddress.City;
          this.DCountry= this.deliveryAddress.Country;
          this.DFullname= this.deliveryAddress.Fullname;
          this.DLandMark = this.deliveryAddress.LandMark;
          this.DPhoneNumber = this.deliveryAddress.PhoneNumber;
          this.DState = this.deliveryAddress.State;


          this.PAddressLine1 = this.pickupAddress.AddressLine1;
          this.PAddressLine2= this.pickupAddress.AddressLine2;
          this.PCity= this.pickupAddress.City;
          this.PCountry= this.pickupAddress.Country;
          this.PFullname= this.pickupAddress.Fullname;
          this.PLandMark = this.pickupAddress.LandMark;
          this.PPhoneNumber = this.pickupAddress.PhoneNumber;
          this.PState = this.pickupAddress.State;

        this.uploadedImages =  this.recycleRequestDetail.UploadeImages;

        
        var tokenData = this.authService.currentUser;
        console.log(tokenData.Role);
        this.currentUserRole =tokenData.Role;
     
     if( this.currentUserRole.toUpperCase() == 'BO USER')
      {
        this.isFinalPriceEditable =false;
      }
      else{
        this.isFinalPriceEditable =true;
      }
    },error => console.log(error));

        }
      }
    )
   

     
  }
 

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


  onPickUpChange(event: any): void{
    let selectedVal : any = event.target.value;
    this.shipmentType = selectedVal;
  }

  onChange(event: any): void{
    let selectedVal : any = event.target.value;
    this.estimatedPrice-=selectedVal;
  }

  onPincodeBlur(): void{
    this.showAddress = true;
  }

  

  ApproveReject(flag : boolean){
     

    var ApprovalModel = new approverejectdata();
    ApprovalModel.id = this.requestID;
    ApprovalModel.approved = flag;
    ApprovalModel.comment = this.remarks;
    ApprovalModel.finalRecycleValue = this.tentativeRecycleValue;

    if(ApprovalModel.approved == false &&  ApprovalModel.comment == '')
    {
      alert('Please Enter remarks!!!');
    }
    else if(this.currentUserRole.toUpperCase() === 'BO USER' && this.status === 'Approved By BO')
    {
        alert('You are not authorised to approve or reject vendor requests');
    }
    else
  {
    this.approveRejectService.TakeAction(ApprovalModel)
    .subscribe(
      res => {
          if(flag  === true)
          {
            alert('Request Accepeted Successfully!!!');
            this.GotoRequestList();
            
          }
          else
          {
            alert('Request Rejected Successfully!!!');
            this.GotoRequestList();
          }
         console.log(res);

    },error =>   alert('Error Occured while cancelling the request !!')
    );
  }
      
     
  }



   

  GotoRequestList(){
    var status ='';
    if(this.currentUserRole.toUpperCase() =='BO USER')  
    {
      status = 'Submitted';
    }
    else 
    {
      status ='Approved By BO'
    }
    var requestListUrl =   status ===''?'/claimlist/Submitted': '/claimlist/' + status 
    this.router.navigate([requestListUrl]);
  }
}
