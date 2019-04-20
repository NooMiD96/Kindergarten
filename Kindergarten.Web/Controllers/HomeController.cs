using Core.Helpers;

using Database.Contexts;

using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

using System.Diagnostics;
using System.Threading.Tasks;

using static Core.Antiforgery.Xsrf;

namespace Web.Controllers
{
    public class HomeController: Controller
    {
        private readonly KindergartenContext _context;
        private readonly IAntiforgery _antiforgery;

        public HomeController(KindergartenContext context, IAntiforgery antiforgery)
        {
            _context = context;
            _antiforgery = antiforgery;
        }

        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewData["user"] = JsonHelper.Serialize(new
                {
                    userName = User.Identity.Name,
                    userType = User.GetUserRole()
                });
                ViewData["xpt"] = XsrfToXpt(_antiforgery.GetTokens(HttpContext));
                ViewData["notify"] = JsonHelper.Serialize(await _context.GetNotify());
            }

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}