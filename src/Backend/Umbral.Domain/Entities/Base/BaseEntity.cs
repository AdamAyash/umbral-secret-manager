
using System.ComponentModel.DataAnnotations;

namespace Umbral.Domain.Entities.Base;

public class BaseEntity
{
    [Key]
    public int Id { get; private set; }
    [Key]
    public Guid GUID { get; private set; }
    public DateTime DateCreated { get; private set; }
    public DateTime DateUpdated { get; private set; }

    protected BaseEntity()
    {
    }
}
