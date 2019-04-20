using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.Identity;

namespace Database.Contexts
{
    public partial class KindergartenContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public KindergartenContext(DbContextOptions<KindergartenContext> options) : base(options) { }

        static private object lockObj = new object();

        public DbSet<Post> Post { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Children> Children { get; set; }
        public DbSet<ChildrenInformation> ChildrenInformation { get; set; }
        public DbSet<Medicament> Medicament { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("ApplicationUser");

            modelBuilder.Entity<Comment>()
                .HasOne(x => x.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
