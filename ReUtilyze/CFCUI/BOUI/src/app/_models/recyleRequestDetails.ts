export interface recycleRequestDetails {
    Id: string;
    RequestNo: string;
    PreviousPurchaseOrderNo?: null;
    RequestDate: string;
    FutureRecycleDate?: null;
    TransactionType?: null;
    UserId: string;
    UserName: string;
    UserEmailId: string;
    MaxRecycleValue: number;
    TentativeRecycleValue: number;
    FinalRecycleValue: number;
    Status: string;
    ReviewedBy?: null;
    ReviewedOn?: null;
    ReviewComment?: null;
    PhysicallyVerifiedBy?: null;
    PhysicallyVerifiedOn?: null;
    PhysicallyVerificationComment?: null;
    DispatchMode: string;
    PickupCarrierName?: null;
    PickupTrackingNumber?: null;
    Defects?: (DefectsEntity)[] | null;
    Varient: Varient;
    UploadeImages?: (string)[] | null;
    PickupAddress: DeliveryAddressOrPickupAddress;
    DeliveryAddress: DeliveryAddressOrPickupAddress;

DAddressLine1: string; 
DAddressLine2: string;
DCity: string;
DCountry: string;
DFullname: string;
DLandMark: string;
DPhoneNumber: string;
DState: string;

PAddressLine1 : string;
PAddressLine2: string;
PCity: string;
PCountry: string;
PFullname: string;
PLandMark: string;
PPhoneNumber: string;
PState: string;
  }
  export interface DefectsEntity {
    Id: string;
    DefectTitle: string;
    DefectDescription: string;
    DisplaySequence: number;
    IsRequired: boolean;
    IsMultiSelected: boolean;
    IsActive: boolean;
    Varient: Varient1;
    DefectDetails?: (DefectDetailsEntity)[] | null;
  }
  export interface Varient1 {
    Id: string;
    VarientName: string;
    Processor: string;
    RAM: string;
    Storage: string;
    BatteryCapacity: string;
    Camera: string;
    VPN: string;
    MaxRecycleValue: number;
    Model: Model;
  }
  export interface Model {
    Id: string;
    ModelName: string;
    ModelImageName: string;
    Brand: Brand;
  }
  export interface Brand {
    Id: string;
    BrandName: string;
    BrandImageName: string;
    Category: Category;
    Vendor?: null;
  }
  export interface Category {
    Id: string;
    CategoryName: string;
    CategoryImageName: string;
  }
  export interface DefectDetailsEntity {
    Id: string;
    Description: string;
    ImageName: string;
    DisplaySequence: number;
    RecycleValue: number;
  }
  export interface Varient {
    Id: string;
    VarientName: string;
    Processor: string;
    RAM: string;
    Storage: string;
    BatteryCapacity: string;
    Camera: string;
    VPN: string;
    MaxRecycleValue: number;
    Model: Model1;
  }
  export interface Model1 {
    Id: string;
    ModelName: string;
    ModelImageName: string;
    Brand: Brand1;
  }
  export interface Brand1 {
    Id: string;
    BrandName: string;
    BrandImageName: string;
    Category: Category;
    Vendor: Vendor;
  }
  export interface Vendor {
    Id: string;
    VendorName: string;
    DeliveryAddress: DeliveryAddressOrPickupAddress;
  }
  export class DeliveryAddressOrPickupAddress {
    Fullname: string;
    PhoneNumber: string;
    ZipCode: string;
    AddressLine1: string;
    AddressLine2: string;
    LandMark: string;
    City: string;
    State: string;
    Country: string;
  }
  