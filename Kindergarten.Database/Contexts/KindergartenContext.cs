using Kindergarten.Model.Kindergarten;

using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    public partial class KindergartenContext : DbContext
    {
        static private object lockObj = new object();

        public DbSet<User> Users { get; set; }

        public DbSet<Fetcher> Fetchers { get; set; }
        public DbSet<FetcherData> FetchersData { get; set; }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }

        public KindergartenContext(DbContextOptions<KindergartenContext> options) : base(options) { }
    }
}
