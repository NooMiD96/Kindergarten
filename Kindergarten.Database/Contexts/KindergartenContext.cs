using Kindergarten.Model.Kindergarten;

using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    public partial class KindergartenContext : DbContext
    {
        static private object lockObj = new object();
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Visitation> Visitations { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Separation> Separations { get; set; }
        public DbSet<Symptom> Symptoms { get; set; }
        public KindergartenContext(DbContextOptions<KindergartenContext> options) : base(options) { }
    }
}
