using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace RecyclingForRewards.Domain.Entities
{
    public class Defect
    {
        public Defect()
        {
            DefectDetails = new List<DefectDetail>();
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string DefectTitle { get; set; }
        public string DefectDescription { get; set; }
        public int DisplaySequence { get; set; }
        public bool IsRequired { get; set; }
        public bool IsMultiSelected { get; set; }
        public bool IsActive { get; set; }      
        public Varient Varient { get; set; }
        public ICollection<DefectDetail> DefectDetails { get; set; }
    }

    public class DefectDetail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Description { get; set; }
        public string ImageName { get; set; }
        public int DisplaySequence { get; set; }
        public int RecycleValue { get; set; }
    }
}
