using System.ComponentModel.DataAnnotations.Schema;
using Umbral.Domain.Entities.Base;

namespace Umbral.Domain.Entities.Identity;

[Table("UserProfiles", Schema ="Users")]
public class UserProfilesEntity : BaseEntity
{
}
