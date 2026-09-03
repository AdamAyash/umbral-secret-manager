

using Microsoft.EntityFrameworkCore;

namespace Umbral.Infrastructure.Persistence.Application;

public sealed class ApplicationDatabaseContext : DbContext
{
    public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> databseContextOptions)
        :base(databseContextOptions)
    {
    }
}
