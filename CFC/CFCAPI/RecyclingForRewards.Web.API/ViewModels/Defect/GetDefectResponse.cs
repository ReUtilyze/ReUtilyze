using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.Defect
{
    public class GetDefectResponse
    {
        public string Id { get; set; }
        public string defectTitle { get; set; }
        public string defectDescription { get; set; }
        public int displaySequence { get; set; }
        public bool isRequired { get; set; }
        public bool isMultiSelected { get; set; }
        public bool isActive { get; set; }

        public List<DefectDetailVM> defectDetailsVM { get; set; }

    }

    public class DefectDetailVM
    {
         
        public string Id { get; set; }
        public string Description { get; set; }
        public string ImageName { get; set; }
        public int DisplaySequence { get; set; }
        public int RecycleValue { get; set; }
    }


}
