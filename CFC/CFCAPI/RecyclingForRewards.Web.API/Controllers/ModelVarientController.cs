using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Varient;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VarientController : ControllerBase
    {
        private readonly IMongoCollection<Domain.Entities.Varient> _varients;

        public VarientController(CFCDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _varients = database.GetCollection<Domain.Entities.Varient>(databaseSettings.VarientsCollection);
        }
        [HttpGet("GetVarientsByModelId/{modelId}")]
        public async Task<ActionResult<IList<GetVarientResponse>>> GetVarientsByModelId(string modelId)
        {
            var list = await _varients.Find(x => x.Model.Id == modelId).Project(x => new GetVarientResponse
            {
                Id = x.Id,
                VarientName = x.VarientName,
                Processor = x.Processor,
                RAM = x.RAM,
                Storage = x.Storage,
                BatteryCapacity = x.BatteryCapacity,
                Camera = x.Camera,
                VPN = x.VPN,
                MaxRecycleValue = x.MaxRecycleValue,
                Model = new GetVarientResponseModel
                {
                    Id = x.Model.Id,
                    ModelName = x.Model.ModelName,
                    ModelImageName = x.Model.ModelImageName,
                    Brand = new GetVarientResponseBrand
                    {
                        Id = x.Model.Brand.Id,
                        BrandName = x.Model.Brand.BrandName,
                        Category = new GetVarientResponseCategory
                        {
                            Id = x.Model.Brand.Category.Id,
                            CategoryName = x.Model.Brand.Category.CategoryName
                        }
                    }
                }
            })
            .ToListAsync();
            return list;
        }

        [HttpGet("GetVarientsByVarientId/{varientId}")]
        public async Task<ActionResult<GetVarientResponse>> GetVarientsByVarientId(string varientId)
        {
            var model = await _varients.Find(x => x.Id == varientId).Project(x => new GetVarientResponse
            {
                Id = x.Id,
                VarientName = x.VarientName,
                Processor = x.Processor,
                RAM = x.RAM,
                Storage = x.Storage,
                BatteryCapacity = x.BatteryCapacity,
                Camera = x.Camera,
                VPN = x.VPN,
                MaxRecycleValue = x.MaxRecycleValue,
                Model = new GetVarientResponseModel
                {
                    Id = x.Model.Id,
                    ModelName = x.Model.ModelName,
                    ModelImageName = x.Model.ModelImageName,
                    Brand = new GetVarientResponseBrand
                    {
                        Id = x.Model.Brand.Id,
                        BrandName = x.Model.Brand.BrandName,
                        Category = new GetVarientResponseCategory
                        {
                            Id = x.Model.Brand.Category.Id,
                            CategoryName = x.Model.Brand.Category.CategoryName
                        }
                    }
                }

            }).FirstOrDefaultAsync();

            return model;
        }

        //private readonly IModelVarientService _varient;
        //public VarientController(IModelVarientService varient)
        //{
        //    _varient = varient;
        //}

        //[HttpGet]
        //public ActionResult<List<Varient>> Get() => _varient.Get();

        //[HttpGet("{id:length(24)}", Name = "Varient")]
        //public ActionResult<Varient> Get(string id)
        //{
        //    var Varient = _varient.Get(id);

        //    if (Varient == null)
        //    {
        //        return NotFound();
        //    }

        //    return Varient;
        //}

        //[HttpPost]
        //public ActionResult<Varient> Create(Varient varient)
        //{
        //    _varient.Create(varient);

        //    return CreatedAtRoute("GetBrand", new { id = varient.Id.ToString() }, varient);
        //}

        //[HttpPut("{id:length(24)}")]
        //public IActionResult Update(string id, Varient brandIn)
        //{
        //    var Varient = _varient.Get(id);

        //    if (Varient == null)
        //    {
        //        return NotFound();
        //    }

        //    _varient.Update(id, brandIn);

        //    return NoContent();
        //}

        //[HttpDelete("{id:length(24)}")]
        //public IActionResult Delete(string id)
        //{
        //    var Varient = _varient.Get(id);

        //    if (Varient == null)
        //    {
        //        return NotFound();
        //    }

        //    _varient.Remove(Varient.Id);

        //    return NoContent();
        //}
    }
}
