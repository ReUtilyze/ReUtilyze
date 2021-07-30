using RecyclingForRewards.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.RecycleRequest
{
    public class GetRecycleRequestDetailsResponse
    {
        public string Id { get; set; }
        public string RequestNo { get; set; }
        public DateTime? RequestDate { get; set; }
        public string UserName { get; set; }
        public string UserEmailId { get; set; }
        public double MaxRecycleValue { get; set; }
        public double TentativeRecycleValue { get; set; }
        public double FinalRecycleValue { get; set; }
        public string Status { get; set; }
        public string ReviewedBy { get; set; }
        public DateTime? ReviewedOn { get; set; }
        public string ReviewComment { get; set; }
        public string PhysicallyVerifiedBy { get; set; }
        public DateTime? PhysicallyVerifiedOn { get; set; }
        public string PhysicallyVerificationComment { get; set; }
        public string DispatchMode { get; set; }
        public string PickupCarrierName { get; set; }
        public string PickupTrackingNumber { get; set; }
        public ICollection<VMDefect> VMDefects { get; set; }
      //  public Models BrandModel { get; set; }
    }

    public class VMDefect
    {
        public string Id { get; set; }
        public string DefectTitle { get; set; }
        public string DefectDescription { get; set; }
        public int DisplaySequence { get; set; }
        public bool IsRequired { get; set; }
        public bool IsMultiSelected { get; set; }
        public bool IsActive { get; set; }
        //public Varient Varient { get; set; }
        public ICollection<VMDefectDetail> VMDefectDetails { get; set; }
    }

    public class VMDefectDetail
    {
        public int Id { get; set; }
        public string Descriptionn { get; set; }
        public string ImageName { get; set; }
        public int DisplaySequence { get; set; }
        public int RecycleValue { get; set; }
    }

    public class VMRequestDeliveryAddress
    {
        public string Fullname { get; set; }
        public string PhoneNumber { get; set; }
        public string ZipCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string LandMark { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int RequestId { get; set; }
    }

    public class VMRequestPickupAddress
    {
        public string Fullname { get; set; }
        public string PhoneNumber { get; set; }
        public string ZipCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string LandMark { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int RequestId { get; set; }
    }
}
