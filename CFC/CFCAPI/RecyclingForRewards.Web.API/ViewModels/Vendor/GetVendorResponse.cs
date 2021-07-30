using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.Vendor
{
    public class GetVendorResponse
    {
        public string Id { get; set; }
        public string VendorName { get; set; }

        public List<VendorDetailVM> vendorDetailVM { get; set; }
    }

    public class VendorDetailVM
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
