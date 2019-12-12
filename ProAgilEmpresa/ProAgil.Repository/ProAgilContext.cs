using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;
using ProAgil.Domain.Identity;

namespace ProAgil.Repository
{
    public class ProAgilContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, 
        UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>
    >
    {
        public ProAgilContext(DbContextOptions<ProAgilContext> options) : base(options) {}

        public DbSet<Empresa> Empresas { get; set;}
    
    
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>(userRole => {
                userRole.HasKey(uk => new {uk.UserId,uk.RoleId});
                
                userRole.HasOne(ur => ur.User)
                    .WithMany(ur => ur.Roles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
                
                userRole.HasOne(ur => ur.Role)
                    .WithMany(ur => ur.Users)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

            });
            
            base.OnModelCreating(modelBuilder);
        }
    }
}