using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Category;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoryController(CFCDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _categories = database.GetCollection<Category>(databaseSettings.CategoriesCollection);
        }
        [HttpGet("GetCategory")]
        public async Task<ActionResult<IList<GetCategoryResponse>>> Get()
        {           
            var list = await _categories.Find(x => true).Project(x => new GetCategoryResponse
            {
                Id = x.Id,
                CategoryName = x.CategoryName,
                CategoryImageName = x.CategoryImageName
            }).ToListAsync();

            return list;
        }

    }
}
