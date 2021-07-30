using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.Account
{
    public class GetProfileResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }

        public string Email { get; set; }
        public string MobileNo { get; set; }

        public double? WalletBalance { get; set; }
    }
}
