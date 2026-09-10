#region
using Microsoft.EntityFrameworkCore;
using Umbral.Domain.Entities.Users;
using Umbral.Infrastructure.Persistence.Base;
#endregion

namespace Umbral.Infrastructure.Persistence.Application;

public sealed class ApplicationDatabaseContext : BaseDatabaseContext
{
    public DbSet<UserProfilesEntity> UserProfiles { get; set; }

    public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> databseContextOptions)
        :base(databseContextOptions)
    {
    }
}
