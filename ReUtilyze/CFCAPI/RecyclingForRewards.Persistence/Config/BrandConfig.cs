using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecyclingForRewards.Domain.Entities;

namespace RecyclingForRewards.Persistence.Config
{
    public class BrandConfig : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.BrandName).IsRequired().HasMaxLength(100);
            builder.Property(a => a.BrandImageName).IsRequired().HasMaxLength(100);
        }
    }
}
