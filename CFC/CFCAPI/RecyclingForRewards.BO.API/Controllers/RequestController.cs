using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecyclingForRewards.Domain.Entities;
using RecyclingForRewards.BO.API.ViewModels;
using MongoDB.Driver;
using RecyclingForRewards.BO.API.Data;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver.Linq;
using RecyclingForRewards.BO.API.ViewModels.Constants;

namespace RecyclingForRewards.BO.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IMongoCollection<RecycleRequest> _recycleRequests;
        private readonly IMongoCollection<BackOfficeUser> _boUsers;
        private readonly CurrentUserInfo _currentUserInfo;
        private readonly IMongoCollection<User> _users;

        public RequestController(CFCDatabaseSettings databaseSettings, CurrentUserInfo currentUserInfo)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _recycleRequests = database.GetCollection<RecycleRequest>(databaseSettings.RecycleRequestCollection);
            _boUsers = database.GetCollection<BackOfficeUser>(databaseSettings.BackOfficeUsersCollection);
            _users = database.GetCollection<User>(databaseSettings.UsersCollection);
            _currentUserInfo = currentUserInfo;
        }

        private IList<string> VendorStatusList()
        {
            var list = new List<string>();
            list.Add(RecycleRequestStatusConstants.APPROVED_BY_BO);
            list.Add(RecycleRequestStatusConstants.APPROVED_BY_Vendor);
            list.Add(RecycleRequestStatusConstants.REJECTED_BY_Vendor);

            return list;
        }

        [HttpGet("GetRequests")]
        public async Task<ActionResult<IList<GetRequestsResponse>>> GetRequests(string status, DateTime? fromDate, DateTime? toDate)
        {
            //var query = _recycleRequests.AsQueryable();
            //if (!string.IsNullOrEmpty(status) && status != "Total Requests") query = query.Where(x => x.Status == status);
            //if (fromDate != null && toDate != null)
            //{
            //    toDate = toDate.Value.Date.AddDays(1).AddTicks(-1);
            //    query = query.Where(x => x.RequestDate >= fromDate.Value.Date && x.RequestDate <= toDate);
            //}
            //if (_currentUserInfo.Role == BackOfficeUserRoles.VENDOR)
            //{
            //    //get vendorId of current user
            //    var vendorId = await _boUsers.Find(x => x.Id == _currentUserInfo.Id).Project(y => y.Vendor.Id).FirstOrDefaultAsync();
            //    query = query.Where(x => VendorStatusList().Contains(x.Status) &&
            //                            x.Varient.Model.Brand.Vendor.Id == vendorId);
            //}

            //var list = await query.Select(x => new GetRequestsResponse
            //{
            //    Id = x.Id,
            //    RequestNo = x.RequestNo,
            //    RequestDate = x.RequestDate,
            //    ModelVariant = x.Varient.Model.Brand.BrandName + " " + x.Varient.Model.ModelName,
            //    FinalRecycleValue = x.FinalRecycleValue,
            //    MaxRecycleValue = x.MaxRecycleValue,
            //    TentativeRecycleValue = x.TentativeRecycleValue,
            //    Status = x.Status
            //}).ToListAsync();


            var builder = Builders<RecycleRequest>.Filter;
            var filter = builder.Empty;
            if (!string.IsNullOrEmpty(status) && status != "Total Requests") filter = builder.And(filter, builder.Eq(x => x.Status, status));
            if (fromDate != null && toDate != null)
            {
                toDate = toDate.Value.Date.AddDays(1).AddTicks(-1);
                filter = builder.And(filter, builder.Gte(x => x.RequestDate, fromDate.Value.Date) & builder.Lte(x => x.RequestDate, toDate));
            }
            if (_currentUserInfo.Role == BackOfficeUserRoles.VENDOR)
            {
                //get vendorId of current user
                var vendorId = await _boUsers.Find(x => x.Id == _currentUserInfo.Id).Project(y => y.Vendor.Id).FirstOrDefaultAsync();
                filter = builder.And(filter, builder.In(x => x.Status, VendorStatusList()) & builder.Eq(x => x.Varient.Model.Brand.Vendor.Id, vendorId));
            }

            var list = await _recycleRequests.Find(filter).SortByDescending(x => x.RequestDate).Project(x => new GetRequestsResponse
            {
                Id = x.Id,
                RequestNo = x.RequestNo,
                RequestDate = x.RequestDate,
                ModelVariant = x.Varient.Model.Brand.BrandName + " " + x.Varient.Model.ModelName + " " + x.Varient.VarientName,
                FinalRecycleValue = x.FinalRecycleValue,
                MaxRecycleValue = x.MaxRecycleValue,
                TentativeRecycleValue = x.TentativeRecycleValue,
                Status = x.Status
            }).ToListAsync();

            return list;
        }

        [HttpGet("GetRequestsCount")]
        public async Task<ActionResult<IList<GetRequestsCountResponse>>> GetRequestsCount()
        {
            var query = _recycleRequests.AsQueryable();
            if (_currentUserInfo.Role == BackOfficeUserRoles.VENDOR)
            {
                //get vendorId of current user
                var vendorId = await _boUsers.Find(x => x.Id == _currentUserInfo.Id).Project(y => y.Vendor.Id).FirstOrDefaultAsync();
                query = query.Where(x => VendorStatusList().Contains(x.Status) &&
                x.Varient.Model.Brand.Vendor.Id == vendorId);
            }
            //var list = await _recycleRequests.Aggregate()
            //        .Group(y => y.Status,
            //                z => new GetRequestsCountResponse
            //                {
            //                    Status = z.Key,
            //                    Count = z.Sum(a => 1)
            //                }
            //        ).ToListAsync();

            var list = await query.GroupBy(x => x.Status).Select(y => new GetRequestsCountResponse
            {
                Status = y.Key,
                Count = y.Count()
            }).ToListAsync();

            return list;
        }

        [HttpGet("GetRequests/{requestId}")]
        public async Task<ActionResult<RecycleRequest>> GetRequestDetails(string requestId)
        {
            var query = _recycleRequests.AsQueryable();
            query = query.Where(x => x.Id == requestId);
            if (_currentUserInfo.Role == BackOfficeUserRoles.VENDOR)
            {
                //get vendorId of current user
                var vendorId = await _boUsers.Find(x => x.Id == _currentUserInfo.Id).Project(y => y.Vendor.Id).FirstOrDefaultAsync();
                query = query.Where(x => x.Varient.Model.Brand.Vendor.Id == vendorId);
            }

            //var model = await _recycleRequests.Find(x => x.Id == requestId).FirstOrDefaultAsync();

            var model = query.FirstOrDefault();
            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpPost("Verify")]

        public async Task<ActionResult> VerifyRequest(VerifyRequestRequest inputModel)
        {
            //Validations
            if (_currentUserInfo.Role == BackOfficeUserRoles.VENDOR)
            {
                if (string.IsNullOrEmpty(inputModel.Comment))
                {
                    ModelState.AddModelError("Comment", "Comment is required");
                    return BadRequest(ModelState);
                }
                if (inputModel.Approved && inputModel.FinalRecycleValue <= 0)
                {
                    ModelState.AddModelError("FinalRecycleValue", "FinalRecycleValue is required");
                    return BadRequest(ModelState);
                }
            }
            else
            {
                if (!inputModel.Approved && string.IsNullOrEmpty(inputModel.Comment))
                {
                    ModelState.AddModelError("Comment", "Comment is required");
                    return BadRequest(ModelState);
                }
            }

            var query = _recycleRequests.AsQueryable();
            query = query.Where(x => x.Id == inputModel.Id);
            var model = await query.Select(x => new { x.Id, x.Status, VendorId = x.Varient.Model.Brand.Vendor.Id, x.UserId }).FirstOrDefaultAsync();
            if (model == null)
            {
                return NotFound();
            }

            if (_currentUserInfo.Role == BackOfficeUserRoles.VENDOR)
            {
                var vendorId = await _boUsers.Find(x => x.Id == _currentUserInfo.Id).Project(y => y.Vendor.Id).FirstOrDefaultAsync();
                if (model.VendorId != vendorId)
                {
                    ModelState.AddModelError("", "You are not authorized to update this request");
                    return BadRequest(ModelState);
                }
                if (model.Status != RecycleRequestStatusConstants.APPROVED_BY_BO)
                {
                    ModelState.AddModelError("", "You are not authorized to update this request");
                    return BadRequest(ModelState);
                }
                var updateDef = Builders<RecycleRequest>.Update
                    .Set(o => o.Status, inputModel.Approved ? RecycleRequestStatusConstants.APPROVED_BY_Vendor : RecycleRequestStatusConstants.REJECTED_BY_Vendor)
                    .Set(o => o.PhysicallyVerificationComment, inputModel.Comment)
                    .Set(o => o.PhysicallyVerifiedBy, _currentUserInfo.UserName)
                    .Set(o => o.PhysicallyVerifiedOn, DateTime.Now);
                if (inputModel.Approved)
                {
                    updateDef = updateDef.Set(o => o.FinalRecycleValue, inputModel.FinalRecycleValue);
                }
                await _recycleRequests.UpdateOneAsync(x => x.Id == model.Id, updateDef);
                await UpdateWalletBalance(model.UserId, inputModel.FinalRecycleValue);
            }
            else
            {
                if (model.Status != RecycleRequestStatusConstants.SUBMITTED)
                {
                    ModelState.AddModelError("", "You are not authorized to update this request");
                    return BadRequest(ModelState);
                }
                var updateDef = Builders<RecycleRequest>.Update
                    .Set(o => o.Status, inputModel.Approved ? RecycleRequestStatusConstants.APPROVED_BY_BO : RecycleRequestStatusConstants.REJECTED_BY_BO)
                    .Set(o => o.ReviewedBy, _currentUserInfo.UserName)
                    .Set(o => o.ReviewedOn, DateTime.Now);
                if (!inputModel.Approved)
                {
                    updateDef = updateDef.Set(o => o.ReviewComment, inputModel.Comment);
                }
                await _recycleRequests.UpdateOneAsync(x => x.Id == model.Id, updateDef);
            }

            return Ok();
        }

        private async Task UpdateWalletBalance(string userId, double finalRecycleValue)
        {
            var walletBalance = await _users.AsQueryable().Where(x => x.Id == userId).Select(y => y.WalletBalance).FirstOrDefaultAsync();
            var updateDef = Builders<User>.Update
                   .Set(o => o.WalletBalance, (walletBalance == null? 0: walletBalance) + finalRecycleValue);
            await _users.UpdateOneAsync(x => x.Id == userId, updateDef);
        }


    }
}
