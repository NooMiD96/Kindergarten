using System.Linq;
using System.Threading.Tasks;

using Kindergarten.Model.Kindergarten;

namespace Kindergarten.Database.Contexts
{
    public partial class KindergartenContext
    {
        public int GetUserIdByIdentityId(string identityId) => GetUserByIdentityId(identityId)?.UserId ?? 0;
        public User GetUserByIdentityId(string identityId) => Users
            .FirstOrDefault(x => x.IdentityUserId.Equals(identityId));

        public async ValueTask<bool> AddNewUserAsync(string identityId)
        {
            Users.Add(new User
            {
                IdentityUserId = identityId,
            });

            await SaveChangesAsync();

            return true;
        }
    }
}
