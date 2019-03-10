using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;

using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MyMedicine.Controllers.Services;

namespace MyMedicine.Controllers
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public partial class ImportExportController: Controller
    {
        private readonly KindergartenContext _context;
        public ImportExportController([FromServices] KindergartenContext context)
        {
            _context = context;
        }

        // load FROM user TO server
        // saveType:
        // -- 0 - add new
        // -- 1 - edit
        // -- 2 - skip
        [HttpPost("[action]")]
        public async Task<string> Import([FromQuery] int type)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }
            var context = await ControllersServices.GetJsonFromBodyRequestAsync(Request.Body);
            var isParsed = TryDeserialize(context, type);

            if(!isParsed)
            {
                return "false";
            }

            return "true";
        }

        // load FROM server TO user
        [HttpGet("[action]")]
        public async Task<IActionResult> Export()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Content(ControllersServices.ErrorMessage("auth"));
            }
            if (!User.IsInRole("Admin"))
            {
                return Content(ControllersServices.ErrorMessage("Not allowed "));
            }

            using(var memoryStream = new MemoryStream())
            {
                using(var zip = new ZipArchive(memoryStream, ZipArchiveMode.Create))
                {
                    await WriteInFile(zip, "Posts.json", _context.GetAllPost());
                    await WriteInFile(zip, "Symptoms.json", _context.GetAllSymptoms());
                }

                return File(memoryStream.ToArray(), "application/json; charset=UTF-8", "Import.zip");
            }
        }
    }
}