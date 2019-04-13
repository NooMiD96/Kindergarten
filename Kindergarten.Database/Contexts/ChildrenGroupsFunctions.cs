using Model.DB;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        #region Group
        public async Task<Children> GetChildrenListAsync(int groupId)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<(bool isSuccess, string resultMessage)> ChangeChildrenListAsync(int groupId, List<Children> childrenList)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<(bool isSuccess, string resultMessage)> DeleteChildrenListAsync(int groupId, List<int> childrenIdList)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Children
        public async Task<Children> GetChildrenAsync(int childrenId)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<(bool isSuccess, string resultMessage)> ChangeChildrenAsync(int childrenId, Children childrenData)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<(bool isSuccess, string resultMessage)> DeleteChildrenAsync(int childrenId)
        {
            throw new NotImplementedException();
        }
        #endregion

    }
}
