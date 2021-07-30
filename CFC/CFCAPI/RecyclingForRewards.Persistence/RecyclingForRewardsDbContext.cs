using Microsoft.EntityFrameworkCore;
using RecyclingForRewards.Domain.Entities;

namespace RecyclingForRewards.Persistence
{
    public class RecyclingForRewardsDbContext : DbContext
    {
        public RecyclingForRewardsDbContext(DbContextOptions<RecyclingForRewardsDbContext> options)
           : base(options)
        {
        }
        public DbSet<BackOfficeUser> BackOfficeUsers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<BrandModel> BrandModels { get; set; }
        public DbSet<Defect> Defects { get; set; }
        public DbSet<DefectDetail> DefectDetails { get; set; }
        public DbSet<ModelVarient> ModelVarients { get; set; }
        public DbSet<RecycleRequest> RecycleRequests { get; set; }
        public DbSet<RecycleRequestDefectDetail> RecycleRequestDefectDetails { get; set; }       
        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorBrand> VendorBrands { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecyclingForRewardsDbContext).Assembly);
        }
    }
}
