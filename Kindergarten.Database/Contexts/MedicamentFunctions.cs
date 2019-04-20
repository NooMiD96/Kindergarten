using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.ViewModel.Notify;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        public async Task<List<Medicament>> GetMedicamentListAsync() => await Medicament.ToListAsync();

        public async ValueTask<bool> ChangeMedicamentListAsync(List<Medicament> medicamentList)
        {
            var contextMedicamentList = await Medicament.AsNoTracking().ToListAsync();

            foreach (var medicament in medicamentList)
            {
                var index = contextMedicamentList.IndexOf(medicament);

                if (index != -1)
                {
                    contextMedicamentList[index] = medicament;
                    Medicament.Update(contextMedicamentList[index]);
                }
                else
                {
                    medicament.MedicamentId = 0;
                    Medicament.Add(medicament);
                }
            }

            await SaveChangesAsync();

            return true;
        }

        public async ValueTask<bool> DeleteMedicamentListAsync(List<int> medicamentIdList)
        {
            var recordList = Medicament.Where(x => medicamentIdList.Contains(x.MedicamentId))
                                       .AsNoTracking()
                                       .AsEnumerable();

            Medicament.RemoveRange(recordList);

            await SaveChangesAsync();

            return true;
        }

        private async Task<Notify> GetMedicamentNotify()
        {
            var result = new Notify()
            {
                Section = SectionsEnum.Medicament,
                Count = await Medicament.Where(x => x.ExpirationDate < DateTime.Now).CountAsync(),
            };

            return result;
        }
    }
}
