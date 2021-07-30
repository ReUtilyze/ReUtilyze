using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecyclingForRewards.Domain.Entities;

namespace RecyclingForRewards.Persistence.Config
{
    public class CategoryConfig : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.CategoryImageName).IsRequired().HasMaxLength(100);
            builder.Property(a => a.CategoryImageName).IsRequired().HasMaxLength(100);
        }
    }
}
