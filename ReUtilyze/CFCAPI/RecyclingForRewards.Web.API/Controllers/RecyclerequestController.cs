using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.Web.API.Data;
using RecyclingForRewards.Web.API.Services.Interfaces;
using RecyclingForRewards.Web.API.ViewModels.Constants;
using RecyclingForRewards.Web.API.ViewModels.Defect;
using RecyclingForRewards.Web.API.ViewModels.RecycleRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MongoDB.Driver.Linq;

namespace RecyclingForRewards.Web.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecycleRequestController : ControllerBase
    {
        private readonly IMongoCollection<RecycleRequest> _recycleRequests;
        private readonly IMongoCollection<Defect> _defects;
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Varient> _varients;
        private readonly CurrentUserInfo _currentUserInfo;
        public RecycleRequestController(CFCDatabaseSettings databaseSettings, CurrentUserInfo currentUserInfo)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _recycleRequests = database.GetCollection<RecycleRequest>(databaseSettings.RecycleRequestCollection);
            _defects = database.GetCollection<Defect>(databaseSettings.DefectsCollection);
            _users = database.GetCollection<User>(databaseSettings.UsersCollection);
            _varients = database.GetCollection<Varient>(databaseSettings.VarientsCollection);
            _currentUserInfo = currentUserInfo;
        }

        [HttpGet("GetRequests")]
        public async Task<ActionResult<IList<GetRecycleRequestResponse>>> GetRecycleRequests(string status, DateTime? fromDate, DateTime? toDate)
        {
            //var query = _recycleRequests.AsQueryable();
            //query = query.Where(x => x.UserId == _currentUserInfo.Id);

            //if (!string.IsNullOrEmpty(status)) query = query.Where(x => x.Status == status);
            //if (fromDate != null && toDate != null)
            //{
            //    toDate = toDate.Value.Date.AddDays(1).AddTicks(-1);
            //    query = query.Where(x => x.RequestDate >= fromDate.Value.Date && x.RequestDate <= toDate);
            //}

            //var list = await query.Select(x => new GetRecycleRequestResponse
            //{
            //    Id = x.Id,
            //    RequestNo = x.RequestNo,
            //    RequestDate = x.RequestDate,
            //    ModelVariant = x.Varient.Model.Brand.BrandName + " " + x.Varient.Model.ModelName,
            //    FinalRecycleValue = x.FinalRecycleValue,
            //    TentativeRecycleValue = x.TentativeRecycleValue,
            //    Status = x.Status
            //}).ToListAsync();

            var builder = Builders<RecycleRequest>.Filter;
            var filter = builder.Eq(x => x.UserId, _currentUserInfo.Id);
            if (!string.IsNullOrEmpty(status)) filter = builder.And(filter, builder.Eq(x => x.Status, status));
            if (fromDate != null && toDate != null)
            {
                toDate = toDate.Value.Date.AddDays(1).AddTicks(-1);
                filter = builder.And(filter, builder.Gte(x => x.RequestDate, fromDate.Value.Date) & builder.Lte(x => x.RequestDate, toDate));
            }

            var list = await _recycleRequests.Find(filter).SortByDescending(x => x.RequestDate).Project(x => new GetRecycleRequestResponse
            {
                Id = x.Id,
                RequestNo = x.RequestNo,
                RequestDate = x.RequestDate,
                ModelVariant = x.Varient.Model.Brand.BrandName + " " + x.Varient.Model.ModelName + " " + x.Varient.VarientName ,
                FinalRecycleValue = x.FinalRecycleValue,
                TentativeRecycleValue = x.TentativeRecycleValue,
                Status = x.Status
            }).ToListAsync();


            return list;
        }

        [HttpGet("GetRequests/{requestId}")]
        public async Task<ActionResult<RecycleRequest>> GetRequestDetails(string requestId)
        {
            var model = await _recycleRequests.Find(x => x.Id == requestId && x.UserId == _currentUserInfo.Id).FirstOrDefaultAsync();

            if (model == null)
            {
                return NotFound();
            }
            return model;
        }


        [HttpPost("Create")]

        public async Task<ActionResult> CreateRecycleRequest(CreateRecycleRequest inputModel)
        {
            var model = new RecycleRequest();
            model.Status = RecycleRequestStatusConstants.SUBMITTED;
            model.RequestNo = "REQ-" + string.Format(DateTime.Now.ToString("HHmmssFFF"));
            model.RequestDate = DateTime.Now;
            //Get Logged in User Details
            var user = await _users.Find(x => x.Id == _currentUserInfo.Id).FirstOrDefaultAsync();
            model.UserId = user.Id;
            model.UserName = user.Name;
            model.UserEmailId = user.Email;
            model.FutureRecycleDate = inputModel.FutureRecycleDate;
            model.TransactionType = model.TransactionType;
          
            //Get Variend details
            var varient = await _varients.Find(x => x.Id == inputModel.VarientId).FirstOrDefaultAsync();
            model.Varient = varient;
            model.MaxRecycleValue = varient.MaxRecycleValue;

            model.DispatchMode = inputModel.DispatchMode;
            model.UploadeImages = inputModel.UploadeImages;
            model.PickupAddress = new RequestPickupAddress
            {
                Fullname = inputModel.PickupAddress.Fullname,
                PhoneNumber = inputModel.PickupAddress.PhoneNumber,
                ZipCode = inputModel.PickupAddress.ZipCode,
                AddressLine1 = inputModel.PickupAddress.AddressLine1,
                AddressLine2 = inputModel.PickupAddress.AddressLine2,
                LandMark = inputModel.PickupAddress.LandMark,
                City = inputModel.PickupAddress.City,
                State = inputModel.PickupAddress.State,
                Country = inputModel.PickupAddress.Country
            };

            //Get drop Address from vendor master
            model.DeliveryAddress = new RequestDeliveryAddress
            {
                Fullname = varient.Model.Brand.Vendor.DeliveryAddress.Fullname,
                PhoneNumber = varient.Model.Brand.Vendor.DeliveryAddress.PhoneNumber,
                ZipCode = varient.Model.Brand.Vendor.DeliveryAddress.ZipCode,
                AddressLine1 = varient.Model.Brand.Vendor.DeliveryAddress.AddressLine1,
                AddressLine2 = varient.Model.Brand.Vendor.DeliveryAddress.AddressLine2,
                LandMark = varient.Model.Brand.Vendor.DeliveryAddress.LandMark,
                City = varient.Model.Brand.Vendor.DeliveryAddress.City,
                State = varient.Model.Brand.Vendor.DeliveryAddress.State,
                Country = varient.Model.Brand.Vendor.DeliveryAddress.Country
            };

            foreach(var item in inputModel.Defects)
            {
                var defect = await GetDefect(item.Id, item.DefectDetails.Select(x => x.Id).ToList());
                model.Defects.Add(defect);
            }

            //Calculate tentative recycle value
            //model.TentativeRecycleValue = CalculateTentativeRecycleValue(model);
            model.TentativeRecycleValue = inputModel.TentativeRecycleValue;
            await _recycleRequests.InsertOneAsync(model);

            return Ok(new CreateRecycleRequestResponse { RequestNo = model.RequestNo });
        }

        private async Task<Defect> GetDefect(string defectId, IList<string> selectedDefectDetailId)
        {
            var defect = await _defects.Find(x => x.Id == defectId).FirstOrDefaultAsync();
            var newDefectDetails = new List<DefectDetail>();

            if(selectedDefectDetailId != null && selectedDefectDetailId.Count > 0)
            {
                foreach(var item in selectedDefectDetailId)
                {
                    var defectDtls = defect.DefectDetails.Where(x => x.Id == item).FirstOrDefault();
                    if(defectDtls != null && !newDefectDetails.Exists(x => x.Id == item))
                    {
                        newDefectDetails.Add(defectDtls);
                    }
                }
            }
            defect.DefectDetails = newDefectDetails;

            return defect;
        }

        private double CalculateTentativeRecycleValue(RecycleRequest model)
        {
            var baseValue = model.Varient.MaxRecycleValue;
            foreach(var item in model.Defects)
            {
                foreach (var item1 in  item.DefectDetails)
                {
                    baseValue += item1.RecycleValue;
                }
            }
            return baseValue;
        }

    }


}
