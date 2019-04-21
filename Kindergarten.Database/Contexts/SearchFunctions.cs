using Core.LINQ;

using Microsoft.EntityFrameworkCore;

using Model.DB;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        public async ValueTask<(bool isSuccess, IEnumerable<Children>, string errorMessage)> SearchChildrenListAsync(string searchString)
        {
            try
            {
                var strings = searchString.Split(' ');

                if (strings.Length == 0)
                    return (false, null, "Строка поиска пуста!");

                Expression<Func<Children, bool>> combineExpressions = x => x.FirstName.Contains(strings[0]) || x.SecondName.Contains(strings[0]);

                for (int i = 1; i < strings.Length; i++)
                {
                    var str = strings[i];
                    Expression<Func<Children, bool>> expr = x => x.FirstName.Contains(str) || x.SecondName.Contains(str);
                    combineExpressions = combineExpressions.Or(expr);
                }

                var childrenList = await Children.Where(combineExpressions).ToListAsync();

                return (true, childrenList, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }
    }
}
