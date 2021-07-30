using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Defect;
using RecyclingForRewards.Web.API.ViewModels.RecycleRequest;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DefectController : ControllerBase
    {
        private readonly IMongoCollection<Domain.Entities.Defect> _defects;

        public DefectController(CFCDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _defects = database.GetCollection<Domain.Entities.Defect>(databaseSettings.DefectsCollection);
        }
        [HttpGet("GetDefect")]
        public async Task<ActionResult<IList<GetDefectResponse>>> Get(string VariantId)
        {
            var list = await _defects.Find(x => x.Varient.Id == VariantId).Project(x => new GetDefectResponse
            {
                Id  = x.Id,
                defectTitle = x.DefectTitle,
                defectDescription = x.DefectDescription,
                displaySequence = x.DisplaySequence,
                isRequired = x.IsRequired,
                isMultiSelected = x.IsMultiSelected,
                isActive = x.IsActive,
                defectDetailsVM = (from d in x.DefectDetails
                                 select new DefectDetailVM()
                                 {
                                     Id = d.Id,
                                     Description = d.Description,
                                     ImageName = d.ImageName,
                                     DisplaySequence = d.DisplaySequence,
                                     RecycleValue = d.RecycleValue

                                 }).ToList()

            }).ToListAsync();


            

            return list;
        }
         

    }
}
