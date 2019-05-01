using Microsoft.EntityFrameworkCore;

using Model.ViewModel.Report;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        public async ValueTask<(bool isSuccess, VisitationReportRecord, string errorMessage)> GetVisitationReportAsync()
        {
            try
            {
                var perMonthReportList = new List<VisitationPerMonthReportRecord>();
                var result = new VisitationReportRecord()
                {
                    VisitationPerMonthReportRecordList = perMonthReportList,
                };
                var totalChildren = await Children.CountAsync();

                if (totalChildren == 0)
                {
                    return (false, null, "Не найден список детей!");
                }

                var date = DateTime.Parse($"01-09-{DateTime.Now.Year - 1}");
                var endDate = DateTime.Parse($"01-06-{date.Year + 1}");
                var totalDays = 0.0;

                #region Помесячный отчёт
                do
                {
                    var report = new VisitationPerMonthReportRecord()
                    {
                        Month = date.Month.ToString(),
                    };

                    var monthVisitationInfo = await Visitation.Where(x => date <= x.Date && x.Date < date.AddMonths(1))
                                                              .ToListAsync();

                    var dayCount = (double)monthVisitationInfo.Where(x => x.Visited)
                                                              .GroupBy(x => x.Date)
                                                              .Count();
                    totalDays += dayCount;

                    var visitationPerDay = new List<int>();
                    //Посещений
                    visitationPerDay = monthVisitationInfo.Where(x => x.Visited)
                                                          .GroupBy(x => x.Date)
                                                          .Select(x => x.Count())
                                                          .ToList();
                    report.VisitedCount = visitationPerDay.Count == 0 
                        ? 0
                        : visitationPerDay.Average();
                    report.VisitedCountPercent = report.VisitedCount / totalChildren * 100;

                    //болезни
                    visitationPerDay = monthVisitationInfo.Where(x => x.Diseased)
                                                          .GroupBy(x => x.Date)
                                                          .Select(x => x.Count())
                                                          .ToList();
                    report.DiseasedCount = visitationPerDay.Count == 0 || dayCount == 0
                        ? 0
                        : visitationPerDay.Sum() / dayCount;
                    report.DiseasedCountPercent = report.DiseasedCount / totalChildren * 100;

                    //др.причинам
                    visitationPerDay = monthVisitationInfo.Where(x => !x.Diseased && !x.Visited)
                                                          .GroupBy(x => x.Date)
                                                          .Select(x => x.Count())
                                                          .ToList();
                    report.NotVisitedCount = visitationPerDay.Count == 0 || dayCount == 0 
                        ? 0
                        : visitationPerDay.Sum() / dayCount;
                    report.NotVisitedCountPercent = report.NotVisitedCount / totalChildren * 100;

                    perMonthReportList.Add(report);
                    date = date.AddMonths(1);
                }
                while (date < endDate);

                var perMonthWithVisitedList = perMonthReportList.Where(x => x.VisitedCount > 0)
                                                                .ToList();

                var averageReport = new VisitationPerMonthReportRecord()
                {
                    Month = "В среднем",
                    VisitedCount = perMonthWithVisitedList.Select(x => x.VisitedCount).Average(),
                    VisitedCountPercent = perMonthWithVisitedList.Select(x => x.VisitedCountPercent).Average(),
                    DiseasedCount = perMonthWithVisitedList.Select(x => x.DiseasedCount).Average(),
                    DiseasedCountPercent = perMonthWithVisitedList.Select(x => x.DiseasedCountPercent).Average(),
                    NotVisitedCount = perMonthWithVisitedList.Select(x => x.NotVisitedCount).Average(),
                    NotVisitedCountPercent = perMonthWithVisitedList.Select(x => x.NotVisitedCountPercent).Average(),
                };

                perMonthReportList.Add(averageReport);
                #endregion

                var visitationForEachChild = new List<(int count, int childrenId)>();

                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = @"
                        SELECT COUNT(*) as count, [ChildrenId] as childrenId
                        FROM [Visitation] AS [x]
                        GROUP BY [x].[ChildrenId], [x].[Diseased]
                        HAVING [x].[Diseased] = 0
                    ";
                    await Database.OpenConnectionAsync();
                    using (var exec = await command.ExecuteReaderAsync())
                        while (exec.Read())
                        {
                            visitationForEachChild.Add(
                                (
                                    exec.GetInt32(exec.GetOrdinal("count")),
                                    exec.GetInt32(exec.GetOrdinal("childrenId"))
                                )
                            );
                        }
                    Database.CloseConnection();
                }

                result.HealthIndex = visitationForEachChild.Where(x => x.count == totalDays).Count() / (double)totalChildren * 100.0;

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }
    }
}
