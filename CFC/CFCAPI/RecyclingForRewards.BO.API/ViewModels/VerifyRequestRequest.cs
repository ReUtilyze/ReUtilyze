using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.BO.API.ViewModels
{
    public class VerifyRequestRequest
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public bool Approved { get; set; }

        public string Comment { get; set; }

        public double FinalRecycleValue { get; set; }
    }
}
