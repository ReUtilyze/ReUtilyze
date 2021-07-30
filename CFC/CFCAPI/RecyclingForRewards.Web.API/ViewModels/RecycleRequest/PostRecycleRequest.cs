using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.ViewModels.RecycleRequest
{
    namespace RecyclingForRewards.Web.API.ViewModels.RecycleRequest
    {
        public class PostRecycleRequest
        {

            public string PreviousPurchaseOrderNo { get; set; }
            public DateTime? FutureRecycleDate { get; set; }

            public string TransactionType { get; set; }
            public string UserName { get; set; } // to be remove
            public string UserEmailId { get; set; } // to be remove
            public double TentativeRecycleValue { get; set; } // to be calculate 
            public string DispatchMode { get; set; }
            public List<DefectVM> Defects { get; set; }

            public ModelVM BrandModel { get; set; }
            public string[] UploadeImages { get; set; }
        }

        public class ModelVM
        {
            public string Id { get; set; }
            public string ModelName { get; set; }
            public string ModelImageName { get; set; }
            public BrandVMCR Brand { get; set; }
        }

        public class BrandVMCR
        {
            public string Id { get; set; }
            public string BrandName { get; set; }
            public string BrandImageName { get; set; }

            public CategoryVMCR Category { get; set; }
        }

        public class CategoryVMCR
        {

            public string Id { get; set; }
            public string CategoryName { get; set; }
            public string CategoryImageName { get; set; }
        }



        public class DefectVM
        {
            public string Id { get; set; }
            public string DefectTitle { get; set; }
            public VarientVMCR Varient { get; set; }
            public List<DefectDetailVMCR> DefectDetails { get; set; }
        }
        public class DefectDetailVMCR
        {
            public string Id { get; set; }
            public string Description { get; set; }
            public int RecycleValue { get; set; }
        }
        public class VarientVMCR
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
        }

        public class tempDefect
        {
            public string Id { get; set; }

            public List<VMDefectDetail> DefectDetail { get; set; }
        }

    }
}
