using Model.ViewModel.Notify;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        public async Task<List<Notify>> GetNotify()
        {
            var result = new List<Notify>()
            {
                await GetMedicamentNotify(),
            };

            return result;
        }
    }
}
