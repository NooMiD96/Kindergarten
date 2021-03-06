﻿using Microsoft.EntityFrameworkCore;

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

                #region Индекс здоровья
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
                #endregion

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        public async ValueTask<(bool isSuccess, VaccinationReportRecord, string errorMessage)> GetVaccinationReportAsync()
        {
            try
            {
                var vaccinationPerTypeList = new List<VaccinationPerTypeReport>();
                var result = new VaccinationReportRecord()
                {
                    VaccinationPerTypeReport = vaccinationPerTypeList,
                };

                VaccinationPerTypeReport report;
                double childWhichCanVaccinat;
                double childWithoutVaccinat;

                //Первый набор
                report = new VaccinationPerTypeReport()
                {
                    Type = "Набор первых прививок",
                };

                childWhichCanVaccinat = await ChildrenInformation.Where(x => x.ApproveFirstVaccination
                                                                         && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _firstVaccinationDate
                                                                         || !x.ApproveFirstVaccination)
                                                           .CountAsync();

                childWithoutVaccinat = await ChildrenInformation.Where(_childrenWithoutFirstVaccination)
                                                          .CountAsync();
                if (childWhichCanVaccinat == 0)
                    report.Percent = 100;
                else
                    report.Percent = 100 - childWithoutVaccinat / childWhichCanVaccinat * 100;
                vaccinationPerTypeList.Add(report);

                //Второй набор
                report = new VaccinationPerTypeReport()
                {
                    Type = "Набор вторых прививок",
                };

                childWhichCanVaccinat = await ChildrenInformation.Where(x => x.ApproveSecondVaccination
                                                                       && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _secondVaccinationDate
                                                                       || !x.ApproveSecondVaccination)
                                                           .CountAsync();

                childWithoutVaccinat = await ChildrenInformation.Where(_childrenWithoutSecondVaccination)
                                                          .CountAsync();

                if (childWhichCanVaccinat == 0)
                    report.Percent = 100;
                else
                    report.Percent = 100 - childWithoutVaccinat / childWhichCanVaccinat * 100;
                vaccinationPerTypeList.Add(report);

                //Третий набор
                report = new VaccinationPerTypeReport()
                {
                    Type = "Набор третьих прививок",
                };

                childWhichCanVaccinat = await ChildrenInformation.Where(x => x.ApproveThirdVaccination
                                                                       && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _thirdVaccinationDate
                                                                       || !x.ApproveThirdVaccination)
                                                           .CountAsync();

                childWithoutVaccinat = await ChildrenInformation.Where(_childrenWithoutThirdVaccination)
                                                          .CountAsync();

                if (childWhichCanVaccinat == 0)
                    report.Percent = 100;
                else
                    report.Percent = 100 - childWithoutVaccinat / childWhichCanVaccinat * 100;
                vaccinationPerTypeList.Add(report);

                //Четвёртый набор
                report = new VaccinationPerTypeReport()
                {
                    Type = "Набор четвёртых прививок",
                };

                childWhichCanVaccinat = await ChildrenInformation.Where(x => x.ApproveFourthVaccination
                                                                       && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _fourthVaccinationDate
                                                                       || !x.ApproveFourthVaccination)
                                                           .CountAsync();

                childWithoutVaccinat = await ChildrenInformation.Where(_childrenWithoutFourthVaccination)
                                                          .CountAsync();

                if (childWhichCanVaccinat == 0)
                    report.Percent = 100;
                else
                    report.Percent = 100 - childWithoutVaccinat / childWhichCanVaccinat * 100;
                vaccinationPerTypeList.Add(report);

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        public async ValueTask<(bool isSuccess, HealthGroupReportRecord, string errorMessage)> GetHealthGroupReportAsync()
        {
            try
            {
                var perHealthGroup = new List<PerHealthGroupRecord>();
                var result = new HealthGroupReportRecord()
                {
                    HealthGroupList = await HealthGroup.ToListAsync(),
                    PerHealthGroupRecordList = perHealthGroup,
                };

                var childrenInfoList = await ChildrenInformation.Include(x => x.Children)
                                                                .ToListAsync();

                var group1 = childrenInfoList.Where(x => x.HealthGroupId == 1).OrderBy(x => x.Children.SecondName).ThenBy(x => x.Children.FirstName).ToList();
                var group2 = childrenInfoList.Where(x => x.HealthGroupId == 2).OrderBy(x => x.Children.SecondName).ThenBy(x => x.Children.FirstName).ToList();
                var group3 = childrenInfoList.Where(x => x.HealthGroupId == 3).OrderBy(x => x.Children.SecondName).ThenBy(x => x.Children.FirstName).ToList();
                var group4 = childrenInfoList.Where(x => x.HealthGroupId == 4).OrderBy(x => x.Children.SecondName).ThenBy(x => x.Children.FirstName).ToList();
                var group5 = childrenInfoList.Where(x => x.HealthGroupId == 5).OrderBy(x => x.Children.SecondName).ThenBy(x => x.Children.FirstName).ToList();

                var maxCount = new int[] { group1.Count, group2.Count, group3.Count, group4.Count, group5.Count };

                for (int i = 0; i < maxCount.Max(); i++)
                {
                    var item1 = group1.ElementAtOrDefault(i);
                    var item2 = group2.ElementAtOrDefault(i);
                    var item3 = group3.ElementAtOrDefault(i);
                    var item4 = group4.ElementAtOrDefault(i);
                    var item5 = group5.ElementAtOrDefault(i);

                    perHealthGroup.Add(new PerHealthGroupRecord()
                    {
                        Group1 = item1 != null ? $"{item1.Children.SecondName} {item1.Children.FirstName}" : null,
                        Group2 = item2 != null ? $"{item2.Children.SecondName} {item2.Children.FirstName}" : null,
                        Group3 = item3 != null ? $"{item3.Children.SecondName} {item3.Children.FirstName}" : null,
                        Group4 = item4 != null ? $"{item4.Children.SecondName} {item4.Children.FirstName}" : null,
                        Group5 = item5 != null ? $"{item5.Children.SecondName} {item5.Children.FirstName}" : null,
                    });
                }

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }
    }
}
