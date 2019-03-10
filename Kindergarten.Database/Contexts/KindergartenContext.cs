using Kindergarten.Model.DB;

using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    public partial class KindergartenContext : DbContext
    {
        static private object lockObj = new object();

        public DbSet<Post> Post { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Children> Children { get; set; }

        public KindergartenContext(DbContextOptions<KindergartenContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>()
                .HasOne(x => x.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
