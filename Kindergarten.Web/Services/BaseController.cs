using Core.Helpers;

using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class BaseController : ControllerBase
    {
        public IActionResult Success<T>(T res)
        {
            return this.Ok(JsonHelper.Serialize(new { data = res }));
        }

        public IActionResult BadRequest(string res)
        {
            return this.Ok(JsonHelper.Serialize(new { error = res }));
        }
    }
}