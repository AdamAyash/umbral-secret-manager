using System.ComponentModel.DataAnnotations.Schema;
using Umbral.Domain.Entities.Base;

namespace Umbral.Domain.Entities.Users;

[Table("UserProfiles", Schema ="Users")]
public class UserProfilesEntity : BaseEntity
{
}
