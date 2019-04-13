using Core.Constants;

using Database.Contexts;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System.Collections.Generic;
using System.Threading.Tasks;

using Web.Controllers;

namespace MyMedicine.Controllers
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class MedicamentController : BaseController
    {
        private readonly KindergartenContext _context;
        public MedicamentController([FromServices] KindergartenContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetMedicamentList()
        {
            var medicamentList = await _context.GetMedicamentListAsync();

            return Success(medicamentList);
        }

        [HttpPatch("[action]")]
        public async Task<IActionResult> ChangeMedicamentList([FromBody] List<Medicament> editList)
        {
            await _context.ChangeMedicamentListAsync(editList);

            return Success(true);
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteMedicamentList([FromBody] List<int> medicamentIdList)
        {
            await _context.DeleteMedicamentListAsync(medicamentIdList);

            return Success(true);
        }
    }
}