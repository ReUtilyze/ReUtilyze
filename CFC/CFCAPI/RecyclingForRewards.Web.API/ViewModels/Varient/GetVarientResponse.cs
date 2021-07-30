using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.Varient
{
    public class GetVarientResponse
    {
        public string Id { get; set; }
        public string VarientName { get; set; }
        public string Processor { get; set; }

        public string RAM { get; set; }

        public string Storage { get; set; }

        public string BatteryCapacity { get; set; }

        public string Camera { get; set; }

        public string VPN { get; set; }
        public double MaxRecycleValue { get; set; }

       // public string ModelName { get; set; }

      public GetVarientResponseModel Model { get; set; }

    }

    public class GetVarientResponseModel
    {
        public string Id { get; set; }
        public string ModelName { get; set; }
        public string ModelImageName { get; set; }
        public GetVarientResponseBrand Brand { get; set; }
    }

    public class GetVarientResponseBrand
    {
        public string Id { get; set; }
        public string BrandName { get; set; }

        public GetVarientResponseCategory Category { get; set; }

    }

    public class GetVarientResponseCategory
    {
        public string Id { get; set; }
        public string CategoryName { get; set; }
    }
}
