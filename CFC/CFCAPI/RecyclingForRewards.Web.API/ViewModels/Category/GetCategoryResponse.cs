using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.Category
{
    public class GetCategoryResponse
    {
        public string Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryImageName { get; set; }
    }
}
