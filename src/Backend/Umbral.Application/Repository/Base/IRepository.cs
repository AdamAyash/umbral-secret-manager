using Umbral.Domain.Entities.Base;

namespace Umbral.Application.Repository.Base;

public interface IRepository<Entity>
    where Entity : BaseEntity
{
}
