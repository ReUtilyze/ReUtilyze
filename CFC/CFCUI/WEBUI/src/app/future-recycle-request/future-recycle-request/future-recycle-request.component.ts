import { CreateRequestService } from './../../services/create-request/create-request.service';
import { GetVarientDetailsService } from './../../services/get-varient-details/get-varient-details.service';
import { AuthService } from './../../services/auth/auth.service';
import { GetDefectsService } from './../../services/get-defects/get-defects.service';
import { GetVarientsService } from './../../services/get-varients/get-varients.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { GetBrandsService } from './../../services/get-brands/get-brands.service';
import { GetCategoriesService } from './../../services/get-categories/get-categories.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GetModelsService } from 'src/app/services/get-models/get-models.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-future-recycle-request',
  templateUrl: './future-recycle-request.component.html',
  styleUrls: ['./future-recycle-request.component.css']
})
export class FutureRecycleRequestComponent implements OnInit {
  currentStep: string = 'step-0';
  currentId: number = 1;
  totalSteps:number = 2;
  estimatedPrice: number = 45000;
  shipmentType: string = 'PickUp';
  showAddress: boolean = false;
  accessoriesDropdownList:any = [];
  glassDefectsDropdownList: any = [];
  displayDefectsDropdownList: any = [];
  bodyDefectsDropdownList: any = [];
  faultsDropdownList: any = [];
  selectedFault: any = [];
  selectedbodyDefectsDropdownList: any = [];
  selecteddisplayDefectsDropdownList: any = [];
  selectedglassDefectsDropdownList: any = [];
  selectedaccessoriesDropdownList: any = [];
  modelDropdownList: any = [];
  brandDropdownList: any = [];
  shipmentTypeSelected: string = 'PickUp';
  selectedItems = [];
  deviceTypeSelected: string = '';
  deviceVariantDropdownList: any = [];
  multiSelectDropdownSettings:IDropdownSettings = {};
  singleSelectDropdownSettings:IDropdownSettings = {};
  categories: any = [];
  recycleRequestForm: FormGroup;
  selectDeviceDetails: any;
  tentativeRecycleValue: number;
  defectPrice: any = [];
  deviceDefectsDropdownList: any = [];
  varientId: string;
  previousPurchaseOrderNo: string;
  futureRecycleDate: any;
  uploadedFileName: string;
  constructor(
    private router: Router,
    private getCategoriesService: GetCategoriesService,
    private getBrandsService: GetBrandsService,
    private getModelsService: GetModelsService,
    private getVarientsService: GetVarientsService,
    private getDefectsService: GetDefectsService,
    private getVarientDetailsService: GetVarientDetailsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private createRequestService: CreateRequestService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.recycleRequestForm = this.fb.group({
      firstName: [this.authService.firstName, Validators.required],
      lastName: [this.authService.lastName, Validators.required],
      userEmailId:[this.authService.currentUser.Email, Validators.required],
      tentativeRecycleValue:[this.tentativeRecycleValue],
      dispatchMode: [this.shipmentTypeSelected],
      mobile:[this.authService.currentUser.MobileNo, Validators.required],
      add1:['', Validators.required],
      add2:['', Validators.required],
      pincode:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      country:['', Validators.required],
      variant: ['', Validators.required],
      accessories: ['', Validators.required],
      glassDefects: ['', Validators.required],
      displayDefects: ['', Validators.required],
      bodyDefects: ['', Validators.required],
      faultsDropdown: ['', Validators.required],
      file: ['']
    });

    this.route.queryParams
    .subscribe(
      (param:any) =>{
        this.varientId = param.variant;
        this.tentativeRecycleValue = parseInt(param.price);
        this.previousPurchaseOrderNo = param.order_number;
        let orderDate = new Date(param.order_date);
        orderDate.setFullYear(orderDate.getFullYear() + parseInt(param.no_of_years));
        this.futureRecycleDate = this.datePipe.transform(orderDate, 'YYYY-MM-ddT00:00:00.000');
        console.log(this.futureRecycleDate);
        
        if(this.varientId){
          let defectOptions: any = [];
          let defectPriceArray: any = [];
          this.getVarientDetailsService.get(this.varientId)
          .subscribe((response:any)=>{
            this.selectDeviceDetails = response;
            if(response){
              this.recycleRequestForm.patchValue({
                variant: this.varientId,
                tentativeRecycleValue: this.tentativeRecycleValue
              });
              this.getDefectsService.get(this.varientId)
              .subscribe((response:any)=>{
                for(let i=0;i<response.length; i++){
                  defectOptions[i] = [];
                  console.log(response[i]);
                  for(let k=0; k<response[i].defectDetailsVM.length; k++){
                    defectPriceArray[response[i].defectDetailsVM[k].Id] =  response[i].defectDetailsVM[k].RecycleValue;
                    defectOptions[i][k] = { id: response[i].defectDetailsVM[k].Id, description: response[i].defectDetailsVM[k].Description, defectLabelId: response[i].Id, defectLabel: response[i].defectTitle };//response[i].defectDetailsVM[k].Description;
                  }
                }
          
                this.defectPrice = defectPriceArray;
                if(defectOptions.length > 0){
                  this.accessoriesDropdownList = defectOptions[0];
                  this.glassDefectsDropdownList = defectOptions[1];
                  this.displayDefectsDropdownList = defectOptions[2];
                  this.bodyDefectsDropdownList = defectOptions[3];
                  this.faultsDropdownList = defectOptions[4];
          
                  this.recycleRequestForm.patchValue({
                    accessories: [defectOptions[0][1], defectOptions[0][2], defectOptions[0][3]],
                    glassDefects: [defectOptions[1][0]],
                    displayDefects: [defectOptions[2][0]],
                    bodyDefects: [defectOptions[3][0]],
                    faultsDropdown: [defectOptions[4][0]]
                  });
                }else{
                  this.accessoriesDropdownList = [];
                  this.glassDefectsDropdownList = [];
                  this.displayDefectsDropdownList = [];
                  this.bodyDefectsDropdownList = [];
                  this.faultsDropdownList = [];
                  this.recycleRequestForm.patchValue({
                    accessories: [],
                    glassDefects: [],
                    displayDefects: [],
                    bodyDefects: [],
                    faultsDropdown: []
                  });
                }
              });
            }
          });
        }
      }
    )

    // this.getCategoriesService.get()
    // .subscribe((response: any)=>{
    //   this.categories = response;
    // })

    this.multiSelectDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

    this.singleSelectDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
  }

  onSelectShipmentType(shipmentType: string){
    this.shipmentTypeSelected = shipmentType;
  }

  onItemSelect(item: any) {
    console.log('selected', item);
  }

  onBrandSelect(event: any){
    console.log(event);
    let modelsArray: any = [];
    this.getModelsService.get(event.id)
    .subscribe((response:any)=>{
      for(let i=0;i<response.length; i++){
        modelsArray.push({ id: response[i].Id, description: response[i].ModelName })
      }
      this.modelDropdownList = modelsArray;
    });
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onFileChange(event: any){
    let file = event.target.files[0];
    this.uploadedFileName = file.name;
  }

  onNext(id:number): void{
    let stepId = id+1;
    this.currentId = stepId;
    this.currentStep = 'step-'+stepId;
  }

  onPrevious(id:number): void{
    let stepId = id-1;
    this.currentId = stepId;
    this.currentStep = 'step-'+stepId;
  }

  onSelectDeviceType(device: string){
    this.deviceTypeSelected = device;
    let brandsArray: any = [];
    this.recycleRequestForm.patchValue({deviceType:device, brand: ''});
    this.getBrandsService.get(device)
    .subscribe((response:any)=>{
      for(let i=0;i<response.length; i++){
        brandsArray.push({ id: response[i].Id, description: response[i].BrandName })
      }
      this.brandDropdownList = brandsArray;
    });
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

  onSubmit():void{
    let accessoriesDefectsArray: any = {};
    accessoriesDefectsArray.defectDetails = [];
    let glassDefectsArray: any = {};
    glassDefectsArray.defectDetails = [];
    let displayDefectsArray: any = {};
    displayDefectsArray.defectDetails = [];
    let bodyDefectsArray: any = {};
    bodyDefectsArray.defectDetails = [];
    let faultsDropdownArray: any = {};
    faultsDropdownArray.defectDetails = [];
    let formRequestJson;
    for(let i = 0; i < this.recycleRequestForm.value.accessories.length; i++){
      accessoriesDefectsArray.id = this.recycleRequestForm.value.accessories[i].defectLabelId;
      accessoriesDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.accessories[i].id});
    }
    for(let i = 0; i < this.recycleRequestForm.value.glassDefects.length; i++){
      glassDefectsArray.id = this.recycleRequestForm.value.glassDefects[i].defectLabelId;
      glassDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.glassDefects[i].id});
    }
    for(let i = 0; i < this.recycleRequestForm.value.displayDefects.length; i++){
      displayDefectsArray.id = this.recycleRequestForm.value.displayDefects[i].defectLabelId;
      displayDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.displayDefects[i].id});
    }
    for(let i = 0; i < this.recycleRequestForm.value.bodyDefects.length; i++){
      bodyDefectsArray.id = this.recycleRequestForm.value.bodyDefects[i].defectLabelId;
      bodyDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.bodyDefects[i].id});
    }
    for(let i = 0; i < this.recycleRequestForm.value.faultsDropdown.length; i++){
      faultsDropdownArray.id = this.recycleRequestForm.value.faultsDropdown[i].defectLabelId;
      faultsDropdownArray.defectDetails.push({id:this.recycleRequestForm.value.faultsDropdown[i].id});
    }
    let defectsArray = [accessoriesDefectsArray, glassDefectsArray, displayDefectsArray, bodyDefectsArray, faultsDropdownArray];
    formRequestJson = {
      previousPurchaseOrderNo: this.previousPurchaseOrderNo,
      futureRecycleDate: this.futureRecycleDate,
      transactionType:'Later',
      tentativeRecycleValue: this.tentativeRecycleValue,
      dispatchMode:'PickUp',
      defects: defectsArray,
      uploadeImages:[this.uploadedFileName],
      varientId:this.recycleRequestForm.value.variant,
      pickupAddress:{
         fullname:this.recycleRequestForm.value.firstName + ' ' +this.recycleRequestForm.value.lastName,
         phoneNumber:this.recycleRequestForm.value.mobile,
         zipCode:this.recycleRequestForm.value.pincode,
         addressLine1:this.recycleRequestForm.value.add1,
         addressLine2:this.recycleRequestForm.value.add2,
         city:this.recycleRequestForm.value.city,
         state:this.recycleRequestForm.value.state,
         country:this.recycleRequestForm.value.country
      }
    };

    console.log(formRequestJson);

    this.createRequestService.post(formRequestJson)
    .subscribe((response: any)=>{
      this.router.navigate(['/web/transaction/success/'+response.RequestNo]);
    })
  }

  onAccessorySelect(event: any): void{
    this.tentativeRecycleValue += this.defectPrice[event.id];
  }

  onAccessoryDeSelect(event: any): void{
    this.tentativeRecycleValue -= this.defectPrice[event.id];
  }

  onGlassDefectsSelect(event: any): void{
    this.tentativeRecycleValue -= this.defectPrice[event.id];
  }

  onGlassDefectsDeSelect(event: any): void{
    this.tentativeRecycleValue += this.defectPrice[event.id];
  }

  onDisplayDefectsSelect(event: any): void{
    this.tentativeRecycleValue -= this.defectPrice[event.id];
  }

  onDisplayDefectDeSelect(event: any): void{
    this.tentativeRecycleValue += this.defectPrice[event.id];
  }

  onBodyDefectsSelect(event: any): void{
    this.tentativeRecycleValue -= this.defectPrice[event.id];
  }

  onBodyDefectDeSelect(event: any): void{
    this.tentativeRecycleValue += this.defectPrice[event.id];
  }

  onFaultsSelect(event: any): void{
    this.tentativeRecycleValue -= this.defectPrice[event.id];
  }

  onFaultsDeSelect(event: any): void{
    this.tentativeRecycleValue += this.defectPrice[event.id];
  }
}
