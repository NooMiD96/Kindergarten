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
        public async Task<IEnumerable<Visitation>> GetVisitationListAsync(DateTime? date)
        {
            var dateTimeNow = date ?? DateTime.Now.GetToday();

            var visitationList = await Visitation.Include(x => x.Children)
                                                 .ThenInclude(x => x.Group)
                                                 .Where(x => x.Date.Equals(dateTimeNow))
                                                 .ToListAsync();

            var existingChildrenIdList = visitationList.Select(x => x.ChildrenId)
                                                       .ToList();

            var missingChildren = await Children.Include(x => x.Group)
                                                .Where(x => !existingChildrenIdList.Contains(x.ChildrenId))
                                                .Select(x => new Visitation()
                                                {
                                                    ChildrenId = x.ChildrenId,
                                                    Children = x,
                                                    Date = dateTimeNow,
                                                    Visited = false,
                                                    Diseased = false,
                                                })
                                                .ToListAsync();

            visitationList.AddRange(missingChildren);

            return visitationList;
        }

        public async ValueTask<(bool isSuccess, string errorMessage)> SaveVisitationListAsync(List<VisitationBase> visitationList)
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
                                                            .Select(x => x as VisitationBase)
                                                            .ToListAsync();

                foreach (var visitation in visitationList)
                {
                    visitation.Date = visitation.Date.GetToday();
                    var index = contextVisitationList.IndexOf(visitation);

                    if (index != -1)
                    {
                        var newVisitation = contextVisitationList[index] as Visitation;
                        if (newVisitation.Visited != visitation.Visited || newVisitation.Diseased != visitation.Diseased)
                        {
                            newVisitation.Visited = visitation.Visited;
                            newVisitation.Diseased = visitation.Diseased;
                            Visitation.Update(newVisitation);
                        }
                    }
                    else
                    {
                        var newVisitation = new Visitation(visitation);
                        newVisitation.Date = dateTimeNow;
                        Visitation.Add(newVisitation);
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
