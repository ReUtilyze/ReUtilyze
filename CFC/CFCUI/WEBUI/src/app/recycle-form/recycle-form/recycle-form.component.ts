import { CreateRequestService } from './../../services/create-request/create-request.service';
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

@Component({
  selector: 'app-recycle-form',
  templateUrl: './recycle-form.component.html',
  styleUrls: ['./recycle-form.component.css']
})
export class RecycleFormComponent implements OnInit {
  currentStep: string = 'step-0';
  currentId: number = 0;
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
  selectedModelVariants: any = [];
  maxRecycleValue: number = 0;
  uploadedFileName: string;
  constructor(
    private router: Router,
    private getCategoriesService: GetCategoriesService,
    private getBrandsService: GetBrandsService,
    private getModelsService: GetModelsService,
    private getVarientsService: GetVarientsService,
    private getDefectsService: GetDefectsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private createRequestService: CreateRequestService
  ) { }

  ngOnInit(): void {
    this.recycleRequestForm = this.fb.group({
      deviceType: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
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
      file: ['', Validators.required]
    });

    this.getCategoriesService.get()
    .subscribe((response: any)=>{
      this.categories = response;
    })

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

  onModelSelect(event: any){
    console.log(event);
    let variantsArray: any = [];
    this.getVarientsService.get(event.id)
    .subscribe((response:any)=>{
      for(let i=0;i<response.length; i++){
        variantsArray.push({ id: response[i].Id, description: response[i].VarientName })
      }
      this.deviceVariantDropdownList = variantsArray;
      this.recycleRequestForm.patchValue({
        variant: [variantsArray[0]]
      })
      this.onVarientSelect(variantsArray[0].id);
      this.selectedModelVariants = response;
    });
  }

  onVarientSelect(id: any){
    let defectsArray: any = [];
    let defectsGroupArray: any = [];
    let defectOptions: any = [];
    let defectPriceArray: any = [];
    this.getDefectsService.get(id)
    .subscribe((response:any)=>{
      this.selectDeviceDetails = this.selectedModelVariants.find(function(item: any) {
        return item.Id == id;
      });
      this.maxRecycleValue = this.selectDeviceDetails.MaxRecycleValue;
      this.tentativeRecycleValue = this.selectDeviceDetails.MaxRecycleValue;

      this.recycleRequestForm.patchValue({
        tentativeRecycleValue: this.tentativeRecycleValue
      });
      for(let i=0;i<response.length; i++){
        defectOptions[i] = [];
        for(let k=0; k<response[i].defectDetailsVM.length; k++){
          defectPriceArray[response[i].defectDetailsVM[k].Id] =  response[i].defectDetailsVM[k].RecycleValue;
          defectOptions[i][k] = { id: response[i].defectDetailsVM[k].Id, description: response[i].defectDetailsVM[k].Description, defectLabelId: response[i].Id, defectLabel: response[i].defectTitle  };//response[i].defectDetailsVM[k].Description;
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
    accessoriesDefectsArray.id = this.accessoriesDropdownList[0].defectLabelId;
    for(let i = 0; i < this.recycleRequestForm.value.accessories.length; i++){
      accessoriesDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.accessories[i].id});
    }
    glassDefectsArray.id = this.glassDefectsDropdownList[0].defectLabelId;
    for(let i = 0; i < this.recycleRequestForm.value.glassDefects.length; i++){
      glassDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.glassDefects[i].id});
    }
    displayDefectsArray.id = this.displayDefectsDropdownList[0].defectLabelId;
    for(let i = 0; i < this.recycleRequestForm.value.displayDefects.length; i++){
      displayDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.displayDefects[i].id});
    }
    bodyDefectsArray.id = this.bodyDefectsDropdownList[0].defectLabelId;
    for(let i = 0; i < this.recycleRequestForm.value.bodyDefects.length; i++){
      bodyDefectsArray.defectDetails.push({id:this.recycleRequestForm.value.bodyDefects[i].id});
    }
    faultsDropdownArray.id = this.faultsDropdownList[0].defectLabelId;
    for(let i = 0; i < this.recycleRequestForm.value.faultsDropdown.length; i++){
      faultsDropdownArray.defectDetails.push({id:this.recycleRequestForm.value.faultsDropdown[i].id});
    }
    let defectsArray = [accessoriesDefectsArray, glassDefectsArray, displayDefectsArray, bodyDefectsArray, faultsDropdownArray];
    formRequestJson = {
      previousPurchaseOrderNo:'',
      futureRecycleDate:'',
      transactionType:'Now',
      tentativeRecycleValue:this.tentativeRecycleValue,
      dispatchMode:'PickUp',
      defects: defectsArray,
      uploadeImages: [this.uploadedFileName],
      varientId:this.recycleRequestForm.value.variant[0].id,
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

    console.log('form',formRequestJson);

    this.createRequestService.post(formRequestJson)
    .subscribe((response: any)=>{
      this.router.navigate(['/web/transaction/success/'+response.RequestNo]);
    })
  }

  onAccessorySelect(event: any): void{
    this.tentativeRecycleValue += this.defectPrice[event.id];
  }

  // onAccessorySelectAll(event: any): void{
  //   console.log(event);
  // }

  onAccessoryDeSelect(event: any): void{
    this.tentativeRecycleValue -= this.defectPrice[event.id];
  }

  onDefectUpdate(event: any): void{
    let pointsOfDefectselected = 0;
    if(this.recycleRequestForm.value.glassDefects.length > 0){
      pointsOfDefectselected+= this.defectPrice[this.recycleRequestForm.value.glassDefects[0].id];
    }else{
      pointsOfDefectselected+= this.defectPrice[this.glassDefectsDropdownList[0].id];
    }

    if(this.recycleRequestForm.value.displayDefects.length > 0){
      pointsOfDefectselected+= this.defectPrice[this.recycleRequestForm.value.displayDefects[0].id];
    }else{
      pointsOfDefectselected+= this.defectPrice[this.displayDefectsDropdownList[0].id];
    }

    if(this.recycleRequestForm.value.bodyDefects.length > 0){
      pointsOfDefectselected+= this.defectPrice[this.recycleRequestForm.value.bodyDefects[0].id];
    }else{
      pointsOfDefectselected+= this.defectPrice[this.bodyDefectsDropdownList[0].id];
    }

    if(this.recycleRequestForm.value.faultsDropdown.length > 0){
      for(let i = 0; i < this.recycleRequestForm.value.faultsDropdown.length; i++){
        pointsOfDefectselected+= this.defectPrice[this.recycleRequestForm.value.faultsDropdown[i].id];
      }
    }else{
      pointsOfDefectselected+= this.defectPrice[this.faultsDropdownList[0].id];
    }

    this.tentativeRecycleValue = this.maxRecycleValue + pointsOfDefectselected;
  }

  // onGlassDefectsSelect(event: any): void{
  //   //console.log(this.tentativeRecycleValue, this.glassDeduction, this.defectPrice[event.id]);
  //   this.tentativeRecycleValue = this.tentativeRecycleValue - this.glassDeduction;
  //   this.glassDeduction = this.defectPrice[event.id];
  //   this.tentativeRecycleValue += this.defectPrice[event.id];
  // }

  // onGlassDefectsDeSelect(event: any): void{
  //   console.log(this.defectPrice[event.id]);
  //   this.tentativeRecycleValue -= this.defectPrice[event.id];
  //   console.log('desselect', this.glassDeduction);
  // }

  // onDisplayDefectsSelect(event: any): void{
  //   console.log(this.defectPrice[event.id]);
  //   this.tentativeRecycleValue -= this.defectPrice[event.id];
  // }

  // onDisplayDefectDeSelect(event: any): void{
  //   this.tentativeRecycleValue += this.defectPrice[event.id];
  // }

  // onBodyDefectsSelect(event: any): void{
  //   this.tentativeRecycleValue -= this.defectPrice[event.id];
  // }

  // onBodyDefectDeSelect(event: any): void{
  //   this.tentativeRecycleValue += this.defectPrice[event.id];
  // }

  // onFaultsSelect(event: any): void{
  //   this.tentativeRecycleValue -= this.defectPrice[event.id];
  // }

  // onFaultsDeSelect(event: any): void{
  //   this.tentativeRecycleValue += this.defectPrice[event.id];
  // }
}
