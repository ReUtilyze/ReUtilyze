using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.RecycleRequest
{

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    

    public class CreateRecycleRequest
    {
        public CreateRecycleRequest()
        {
            Defects = new List<CreateRecycleRequestDefect>();
        }

        public string PreviousPurchaseOrderNo { get; set; }
        public DateTime? FutureRecycleDate { get; set; }
        [Required]
        public string TransactionType { get; set; }
        [Required]
        public int TentativeRecycleValue { get; set; }
        [Required]
        public string DispatchMode { get; set; }
        [Required]
        public List<CreateRecycleRequestDefect> Defects { get; set; }
        [Required]
        public List<string> UploadeImages { get; set; }

        [Required]
        public string VarientId { get; set; }

        public CreateRecycleRequestPickupAddress PickupAddress { get; set; }
    }



    public class CreateRecycleRequestDefect
    {
        public CreateRecycleRequestDefect()
        {
            DefectDetails = new List<CreateRecycleRequestDefectDetail>();
        }

        public string Id { get; set; }
        public List<CreateRecycleRequestDefectDetail> DefectDetails { get; set; }
    }

    public class CreateRecycleRequestDefectDetail
    {
        public string Id { get; set; }
    }

    public class CreateRecycleRequestPickupAddress
    {
        [Required]
        public string Fullname { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string ZipCode { get; set; }
        [Required]
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string LandMark { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
    }


}
