
using Microsoft.EntityFrameworkCore;
using Umbral.Application.Repository;
using Umbral.Domain.Entities.Users;

namespace Umbral.Infrastructure.Persistence.Application.Repositories;

public class UserProfilesRepository : IUserProfilesRepository
{
    private readonly ApplicationDatabaseContext _applicationDatabaseContext;

    public UserProfilesRepository(ApplicationDatabaseContext applicationDatabaseContext)
    {
        this._applicationDatabaseContext = applicationDatabaseContext;
    }

    public async Task<ICollection<UserProfilesEntity>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await this._applicationDatabaseContext.UserProfiles.ToListAsync(cancellationToken);
    }
}
