using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace RecyclingForRewards.Domain.Entities
{
    public class Model
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ModelName { get; set; }
        public string ModelImageName { get; set; }     
        public Brand Brand { get; set; }      
    }

   
}
