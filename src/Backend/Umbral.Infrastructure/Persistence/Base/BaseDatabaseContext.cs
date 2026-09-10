#region
using Microsoft.EntityFrameworkCore;
using Umbral.Infrastructure.Persistence.Application;
#endregion

namespace Umbral.Infrastructure.Persistence.Base;

public abstract class BaseDatabaseContext : DbContext
{
    protected BaseDatabaseContext(DbContextOptions<ApplicationDatabaseContext> databseContextOptions)
        : base(databseContextOptions)
    {
    }
}
