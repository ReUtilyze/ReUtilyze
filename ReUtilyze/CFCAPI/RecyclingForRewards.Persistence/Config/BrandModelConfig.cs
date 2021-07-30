using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecyclingForRewards.Domain.Entities;

namespace RecyclingForRewards.Persistence.Config
{
    public class BrandModelConfig : IEntityTypeConfiguration<BrandModel>
    {
        public void Configure(EntityTypeBuilder<BrandModel> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.ModelName).IsRequired().HasMaxLength(100);
            builder.Property(a => a.ModelImageName).IsRequired().HasMaxLength(100);

            builder.HasOne<Brand>(a => a.Brand)
                   .WithMany(a => a.BrandModels)
                   .HasForeignKey(a => a.BrandId)
                   .IsRequired();

            builder.HasOne<Category>(a => a.Category)
                   .WithMany(a => a.BrandModels)
                   .HasForeignKey(a => a.BrandId)
                   .IsRequired();


        }
    }
}
