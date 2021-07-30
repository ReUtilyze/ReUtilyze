using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.RecycleRequest
{
    public class GetRecycleRequestResponse
    {
            public string Id { get; set; }
            public string RequestNo { get; set; }
            public DateTime? RequestDate { get; set; }
            public string ModelVariant { get; set; }
            public double TentativeRecycleValue { get; set; }
            public double FinalRecycleValue { get; set; }
            public string Status { get; set; }
    }
}
