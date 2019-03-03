﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Kindergarten.Model.Kindergarten;

using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    public partial class KindergartenContext
    {
        public IEnumerable<Symptom> GetAllSymptoms() => Symptoms.AsEnumerable();
        public async Task<List<Symptom>> GetListSymptomsAsync() => await Symptoms.ToListAsync();

        /// <summary>
        /// </summary>
        /// <param name="symptoms">List of symptoms</param>
        /// <param name="type">0 - add new, 1 - edit, 2 - skip</param>
        /// <returns></returns>
        public async ValueTask<bool> ChangeSymptomsListAsync(List<Symptom> symptoms, int type)
        {
            var contextSymptoms = await Symptoms.AsNoTracking().ToListAsync();

            switch (type)
            {
                case 0:
                    symptoms.ForEach(symptom => symptom.SymptomId = 0);
                    Symptoms.AddRange(symptoms.AsEnumerable());

                    break;

                case 1:
                    var index = -1;
                    foreach (var symptom in symptoms)
                    {
                        index = contextSymptoms.IndexOf(symptom);

                        if (index != -1)
                        {
                            contextSymptoms[index] = symptom;
                            Symptoms.Update(contextSymptoms[index]);
                        }
                        else
                        {
                            symptom.SymptomId = 0;
                            Symptoms.Add(symptom);
                        }
                    }

                    break;

                case 2:
                    foreach (var symptom in symptoms)
                        if (!contextSymptoms.Contains(symptom))
                        {
                            symptom.SymptomId = 0;
                            Symptoms.Add(symptom);
                        }

                    break;

                default:
                    break;
            }

            await SaveChangesAsync();

            return true;
        }

        public async ValueTask<bool> DeletesymptomsAsync(List<int> symptoms)
        {
            var contextSymptoms = Symptoms
                .Where(s => symptoms.Contains(s.SymptomId))
                .AsNoTracking()
                .AsEnumerable();

            Symptoms.RemoveRange(contextSymptoms);

            await SaveChangesAsync();

            return true;
        }
    }
}
