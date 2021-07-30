using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {

        private readonly IMongoCollection<Domain.Entities.Model> _models;

        public ModelController(CFCDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _models = database.GetCollection<Domain.Entities.Model>(databaseSettings.ModelsCollection);
        }
        [HttpGet("GetModels")]
        public async Task<ActionResult<IList<GetModelResponse>>> Get(string BrandId)
        {
            var list = await _models.Find(x => x.Brand.Id == BrandId).Project(x => new GetModelResponse
            {
                Id = x.Id,
                ModelName =x.ModelName,
                ModelImageName = x.ModelImageName
            }).ToListAsync();

            return list;
        }
        //private readonly IModelService _modelService;

        //public ModelController(IModelService modelService)
        //{
        //    _modelService = modelService;
        //}

        //[HttpGet]
        //public ActionResult<List<Model>> Get() => _modelService.Get();

        //[HttpGet("{id:length(24)}", Name = "GetModel")]
        //public ActionResult<Model> Get(string id)
        //{
        //    var model = _modelService.Get(id);

        //    if (model == null)
        //    {
        //        return NotFound();
        //    }

        //    return model;
        //}

        //[HttpPost]
        //public ActionResult<Model> Create(Model model)
        //{
        //    _modelService.Create(model);

        //    return CreatedAtRoute("GetModel", new { id = model.Id.ToString() }, model);
        //}

        //[HttpPut("{id:length(24)}")]
        //public IActionResult Update(string id, Model modelIn)
        //{
        //    var model = _modelService.Get(id);

        //    if (model == null)
        //    {
        //        return NotFound();
        //    }

        //    _modelService.Update(id, modelIn);

        //    return NoContent();
        //}

        //[HttpDelete("{id:length(24)}")]
        //public IActionResult Delete(string id)
        //{
        //    var model = _modelService.Get(id);

        //    if (model == null)
        //    {
        //        return NotFound();
        //    }

        //    _modelService.Remove(model.Id);

        //    return NoContent();
        //}

    }
}
