using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace RecyclingForRewards.Domain.Entities
{
    public class RecycleRequest
    {
        public RecycleRequest()
        {
            Defects = new List<Defect>();
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string RequestNo { get; set; }
        public string PreviousPurchaseOrderNo { get; set; }

        public DateTime? RequestDate { get; set; }

        public DateTime? FutureRecycleDate { get; set; }

        public string TransactionType { get; set; }

        public string UserId { get; set; }
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
        public IList<Defect> Defects { get; set; }
        public Varient Varient { get; set; }

        public List<string> UploadeImages { get; set; }

        public RequestPickupAddress PickupAddress { get; set; }

        public RequestDeliveryAddress DeliveryAddress { get; set; }
    }

    public class RequestDeliveryAddress
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
    }

    public class RequestPickupAddress
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
    }
}
