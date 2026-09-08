

using Microsoft.EntityFrameworkCore;
using Umbral.Domain.Entities.Identity;

namespace Umbral.Infrastructure.Persistence.Application;

public sealed class ApplicationDatabaseContext : DbContext
{
    public DbSet<UserProfilesEntity> UserProfiles { get; set; }

    public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> databseContextOptions)
        :base(databseContextOptions)
    {
    }
}
