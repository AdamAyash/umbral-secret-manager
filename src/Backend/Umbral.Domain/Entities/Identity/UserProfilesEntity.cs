using System.ComponentModel.DataAnnotations.Schema;
using Umbral.Domain.Entities.Base;

namespace Umbral.Domain.Entities.Identity;

[Table("UserProfiles", Schema ="Identity")]
public class UserProfilesEntity : BaseEntity
{
}
