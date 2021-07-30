using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Brand;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IMongoCollection<Brand> _brands;

        public BrandController(CFCDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _brands = database.GetCollection<Brand>(databaseSettings.BrandsCollection);
        }
        [HttpGet("GetBrand")]
        public async Task<ActionResult<IList<GetBrandResponse>>> Get(string categoryId)
        {
            var list = await _brands.Find(x => x.Category.Id == categoryId).Project(x => new GetBrandResponse
            {
                Id = x.Id,
                BrandName = x.BrandName,
                BrandImageName = x.BrandImageName
            }).ToListAsync();

            return list;
        }
    }
}
