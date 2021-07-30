using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace RecyclingForRewards.Domain.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }

        public string Email { get; set; }
        public string MobileNo { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public double? WalletBalance { get; set; }
        public string LastLoginIp { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsActive { get; set; }
    }
}
