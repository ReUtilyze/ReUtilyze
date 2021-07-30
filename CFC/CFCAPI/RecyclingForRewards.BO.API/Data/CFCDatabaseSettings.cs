

namespace RecyclingForRewards.BO.API.Data
{
   
    public class CFCDatabaseSettings : ICFCDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }

        public string CategoriesCollection { get; set; }

        public string BrandsCollection { get; set; }

        public string UsersCollection { get; set; }

        public string DefectsCollection { get; set; }

        public string ModelsCollection { get; set; }

        public string RecycleRequestCollection { get; set; }

        public string VarientsCollection { get; set; }

        public string BackOfficeUsersCollection { get; set; }

    }
        

    public interface ICFCDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        public string CategoriesCollection { get; set; }

        public string BrandsCollection { get; set; }

        public string UsersCollection { get; set; }

        public string DefectsCollection { get; set; }

        public string ModelsCollection { get; set; }

        public string RecycleRequestCollection { get; set; }

        public string VarientsCollection { get; set; }

        public string BackOfficeUsersCollection { get; set; }
    }
}
