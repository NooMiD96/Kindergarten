using System.Collections.Generic;
using System.Threading.Tasks;

using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.Kindergarten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MyMedicine.Controllers.Services;

using Newtonsoft.Json;

namespace MyMedicine.Controllers
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class SymptomsController : Controller
    {
        private readonly KindergartenContext _context;
        public SymptomsController([FromServices] KindergartenContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<string> GetSymptoms()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }

            var Symptoms = await _context.GetListSymptomsAsync();

            return JsonConvert.SerializeObject(new { Symptoms }, ControllersServices.JsonSettings);
        }

        [HttpPatch("[action]")]
        public async Task<string> ChangeSymptoms([FromBody] List<Symptom> editList)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }

            await _context.ChangeSymptomsListAsync(editList, 1);

            return "true";
        }
        [HttpDelete("[action]")]
        public async Task<string> DeleteSymptoms([FromBody] List<int> deleteList)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }

            _ = await _context.DeletesymptomsAsync(deleteList);

            return "true";
        }
    }
}