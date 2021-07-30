using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace RecyclingForRewards.Domain.Entities
{
    public class Vendor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string VendorName { get; set; }
        public VendorDeliveryAddress DeliveryAddress { get; set; }

        //public ICollection<VendorDetail> VendorDetails { get; set; }
    }

    public class VendorDeliveryAddress
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
