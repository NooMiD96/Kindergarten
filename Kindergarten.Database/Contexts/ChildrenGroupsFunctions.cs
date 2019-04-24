using Core.LINQ;

using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.ViewModel.Notify;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        /// <summary>
        /// Первая прививка в 3 года и 1 месяц
        /// </summary>
        const int _firstVaccinationDate = 395;
        /// <summary>
        /// Вторая прививка в 3 года и 2 месяца
        /// </summary>
        const int _secondVaccinationDate = 425;
        /// <summary>
        /// Третья прививка в 3 года и 3 месяца
        /// </summary>
        const int _thirdVaccinationDate = 455;
        /// <summary>
        /// Четвёртая прививка в 6 лет
        /// </summary>
        const int _fourthVaccinationDate = 2190;

        Expression<Func<ChildrenInformation, bool>> _childrenWithoutFirstVaccination = x => !x.FirstVaccination
                                                                                            && x.ApproveFirstVaccination
                                                                                            && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _firstVaccinationDate;

        Expression<Func<ChildrenInformation, bool>> _childrenWithoutSecondVaccination = x => !x.SecondVaccination
                                                                                             && x.ApproveSecondVaccination
                                                                                             && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _secondVaccinationDate;

        Expression<Func<ChildrenInformation, bool>> _childrenWithoutThirdVaccination = x => !x.ThirdVaccination
                                                                                            && x.ApproveThirdVaccination
                                                                                            && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _thirdVaccinationDate;

        Expression<Func<ChildrenInformation, bool>> _childrenWithoutFourthVaccination = x => !x.ApproveFourthVaccination
                                                                                             && x.ApproveFourthVaccination
                                                                                             && EF.Functions.DateDiffDay(x.Birthday, DateTime.Now) > _fourthVaccinationDate;

        #region ChildrenGroups
        public async Task<List<Group>> GetChildrenGroupsAsync() => await Group.ToListAsync();
        public async ValueTask<(bool isSuccess, string resultMessage)> ChangeChildrenGroupsAsync(List<Group> groupList)
        {
            try
            {
                var contextList = await Group.AsNoTracking().ToListAsync();

                foreach (var record in groupList)
                {
                    var index = contextList.IndexOf(record);

                    if (index != -1)
                    {
                        contextList[index] = record;
                        Group.Update(contextList[index]);
                    }
                    else
                    {
                        record.GroupId = 0;
                        Group.Add(record);
                    }
                }

                await SaveChangesAsync();

                return (true, null);
            }
            catch(Exception ex)
            {
                return (false, ex.Message);
            }
        }
        public async ValueTask<(bool isSuccess, string resultMessage)> DeleteChildrenGroupsAsync(List<int> idList)
        {
            try
            {
                var recordList = Group.Where(x => idList.Contains(x.GroupId))
                                      .AsNoTracking()
                                      .AsEnumerable();

                Group.RemoveRange(recordList);

                await SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }
        #endregion

        #region Group
        public async Task<IEnumerable<Children>> GetChildrenListAsync(int groupId)
        {
            var group = await Group
                .Include(x => x.ChildrenList)
                .FirstOrDefaultAsync(x => x.GroupId == groupId);

            return group?.ChildrenList ?? new List<Children>();
        }
        public async ValueTask<(bool isSuccess, string resultMessage)> ChangeChildrenListAsync(int groupId, List<Children> childrenList)
        {
            try
            {
                var contextRecord = await Group.FirstOrDefaultAsync(x => x.GroupId == groupId);

                if (contextRecord == null)
                    return (false, "Данная группа не найдена, повторите попытку.");

                await this.Entry(contextRecord)
                          .Collection(x => x.ChildrenList)
                          .LoadAsync();

                var contextChildrenList = contextRecord.ChildrenList.ToList();

                foreach (var record in childrenList)
                {
                    var index = contextChildrenList.IndexOf(record);

                    if (index != -1)
                    {
                        contextChildrenList[index].FirstName = record.FirstName;
                        contextChildrenList[index].SecondName = record.SecondName;
                    }
                    else
                    {
                        record.ChildrenId = 0;
                        record.GroupId = groupId;
                        Children.Add(record);
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
        public async ValueTask<(bool isSuccess, string resultMessage)> DeleteChildrenListAsync(int groupId, List<int> idList)
        {
            try
            {
                var group = await Group.Include(x => x.ChildrenList)
                                       .FirstOrDefaultAsync(x => x.GroupId == groupId);

                var childrenList = group.ChildrenList.ToList();

                var recordList = childrenList.Where(x => idList.Contains(x.ChildrenId))
                                             .AsEnumerable();

                Children.RemoveRange(recordList);

                await SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }
        #endregion

        #region Children
        public async Task<Children> GetChildrenAsync(int childrenId) => await Children.Include(x => x.ChildrenInformation)
                                                                                      .FirstOrDefaultAsync(x => x.ChildrenId == childrenId);
        public async ValueTask<(bool isSuccess, string resultMessage)> ChangeChildrenAsync(int childrenId, Children childrenData)
        {
            try
            {
                var record = await Children.Include(x => x.ChildrenInformation)
                                           .FirstOrDefaultAsync(x => x.ChildrenId == childrenId);

                if (record == null)
                    return (false, "Ребёнок не найден. Повторите попытку");

                record.FirstName = childrenData.FirstName;
                record.SecondName = childrenData.SecondName;

                if (record.ChildrenInformation == null)
                    record.ChildrenInformation = childrenData.ChildrenInformation;
                else if (childrenData.ChildrenInformation != null)
                    this.Entry(record).Reference(x => x.ChildrenInformation).CurrentValue = childrenData.ChildrenInformation;

                await SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }
        public async ValueTask<(bool isSuccess, string resultMessage)> DeleteChildrenAsync(int childrenId)
        {
            try
            {
                var record = await Children.FirstOrDefaultAsync(x => x.ChildrenId == childrenId);

                if (record == null)
                    return (false, "Ребёнок не найден. Повторите попытку");

                Children.Remove(record);

                await SaveChangesAsync();

                return (true, null);
            }
            catch (Exception)
            {

                throw;
            }
            throw new NotImplementedException();
        }

        public async Task<Notify> GetVaccinationNotify()
        {
            var count = await ChildrenInformation.Where(_childrenWithoutFirstVaccination
                                                    .Or(_childrenWithoutSecondVaccination)
                                                    .Or(_childrenWithoutThirdVaccination)
                                                    .Or(_childrenWithoutFourthVaccination)
                                                 ).CountAsync();

            return new Notify()
            {
                Section = SectionsEnum.Vaccination,
                Count = count,
            };
        }
        #endregion

    }
}
