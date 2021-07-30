using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecyclingForRewards.Domain.Entities
{
    public class Varient
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string VarientName { get; set; }
        public string Processor { get; set; }
        public string RAM { get; set; }
        public string Storage { get; set; }
        public string BatteryCapacity { get; set; }
        public string Camera { get; set; }
        public string VPN { get; set; }
        public double MaxRecycleValue { get; set; }

        public Model Model { get; set; }

    }
}
