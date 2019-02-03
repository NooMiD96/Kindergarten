using System;
using System.Threading.Tasks;

using Kindergarten.Core.Helpers;
using Kindergarten.Database.Contexts;
using Kindergarten.Database.Models.Kindergarten;

using Microsoft.AspNetCore.Mvc;

namespace Kindergarten.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FetcherController: BaseController
    {
        private readonly KindergartenContext _fetcher;

        public FetcherController([FromServices] KindergartenContext fetcherContext)
        {
            _fetcher = fetcherContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetStrings()
        {
            var res = await _fetcher.GetStringsAsync();
            return Ok(JsonHelper.Serialize(res));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveString([FromBody] FetcherDataModel fetcherReq)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return BadRequest("Need auth before the add new line");
            }
            if (String.IsNullOrEmpty(fetcherReq.Data))
            {
                return BadRequest("Content is empty");
            }

            await _fetcher.AddNewStringAsync(fetcherReq, User.GetUserId());

            return Ok("Success");
        }
    }
}