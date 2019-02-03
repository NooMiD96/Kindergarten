using System.Threading.Tasks;

using Kindergarten.Controllers.AdminApi.Services;
using Kindergarten.Core.Constants;
using Kindergarten.Core.Helpers;
using Kindergarten.Database.Contexts;
using Kindergarten.Database.Models.Kindergarten;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kindergarten.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("adminapi/[controller]")]
    [ApiController]
    public class TodoController : BaseController
    {
        private readonly KindergartenContext _context;
        private readonly TodoService _service;

        public TodoController([FromServices] KindergartenContext context)
        {
            _context = context;
            _service = new TodoService();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetFirstTodoList()
        {
            var todo = await _context.GetTodoListAsync(User.GetUserId());
            var todoListModel = _service.ConvertToModel(todo);

            return Ok(JsonHelper.Serialize(todoListModel));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveTodoList([FromBody] TodoModel todoListModel)
        {
            var todoList = _service.Deserialize(todoListModel);
            var success = await _context.SaveTodoList(User.GetUserId(), todoList);

            return Ok("Success");
        }
    }
}