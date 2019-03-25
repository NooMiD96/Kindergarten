using Kindergarten.Core.Helpers;

using Microsoft.AspNetCore.Mvc;

namespace Kindergarten.Web.Controllers
{
    public class BaseController : ControllerBase
    {
        public IActionResult Success<T>(T res)
        {
            return this.Ok(JsonHelper.Serialize(new { data = res }));
        }

        public IActionResult BadRequest(string res)
        {
            return this.Success(JsonHelper.Serialize(new { error = res }));
        }
    }
}