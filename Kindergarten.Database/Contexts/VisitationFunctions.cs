using Core.Helpers;

using Microsoft.EntityFrameworkCore;

using Model.DB;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        public async Task<IEnumerable<Visitation>> GetVisitationListAsync()
        {
            var dateTimeNow = DateTime.Now.GetToday();

            var visitationList = await Children.Select(x => new Visitation()
                                             {
                                                    ChildrenId = x.ChildrenId,
                                                    Children = x,
                                                    Date = dateTimeNow,
                                                    Visited = false,
                                             })
                                             .ToListAsync();

            return visitationList;
        }

        public async Task<IEnumerable<Visitation>> GetVisitationListAsync(DateTime date)
        {
            var visitationList = await Visitation.Include(x => x.Children)
                                                 .Where(x => x.Date.Equals(date))
                                                 .ToListAsync();

            var existingChildrenIdList = visitationList.Select(x => x.ChildrenId)
                                                       .ToList();

            var missingChildren = await Children.Where(x => !existingChildrenIdList.Contains(x.ChildrenId))
                                                .Select(x => new Visitation()
                                                {
                                                    ChildrenId = x.ChildrenId,
                                                    Children = x,
                                                    Date = date,
                                                    Visited = false,
                                                })
                                                .ToListAsync();

            visitationList.AddRange(missingChildren);

            return visitationList;
        }

        public async ValueTask<(bool isSuccess, string errorMessage)> SaveVisitationListAsync(List<Visitation> visitationList)
        {
            try
            {
                if (visitationList.Count == 0)
                    return (false, "Список пуст!");

                var dateTimeNow = visitationList.First()
                                                .Date
                                                .GetToday();

                var contextVisitationList = await Visitation.AsNoTracking()
                                                            .Where(x => x.Date.Equals(dateTimeNow))
                                                            .ToListAsync();

                foreach (var visitation in visitationList)
                {
                    var index = contextVisitationList.IndexOf(visitation);

                    if (index != -1)
                    {
                        visitation.VisitationId = contextVisitationList[index].VisitationId;
                        Visitation.Update(visitation);
                    }
                    else
                    {
                        visitation.VisitationId = 0;
                        Visitation.Add(visitation);
                    }
                }

                await SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }
    }
}
