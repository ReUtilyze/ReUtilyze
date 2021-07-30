using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecyclingForRewards.Domain.Entities
{
    public class Brand
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string BrandName { get; set; }
        public string BrandImageName { get; set; }

        public Category Category { get; set; }

        public Vendor Vendor { get; set; }
    }
}
