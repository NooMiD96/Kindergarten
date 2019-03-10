using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.DB;
using Kindergarten.Model.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using MyMedicine.Controllers.Services;

using Newtonsoft.Json;

namespace MyMedicine.Controllers
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly KindergartenContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostController([FromServices] KindergartenContext context, [FromServices] UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<string> GetPreviewPostList([FromQuery] int page, [FromQuery] int pageSize)
        {
            var (Posts, TotalCount) = await _context.GetPreviewPostListAsync(page, pageSize);

            return JsonConvert.SerializeObject(new { Posts, TotalCount }, ControllersServices.JsonSettings);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<string> GetPost([FromQuery] int postid)
        {
            var Post = await _context.GetPostAsync(postid);

            return JsonConvert.SerializeObject(new { Post }, ControllersServices.JsonSettings);
        }

        [HttpPost("[action]")]
        public async Task<string> AddComment([FromQuery] int postid)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }

            var user = await _userManager.GetUserAsync(User);

            var context = await ControllersServices.GetJsonFromBodyRequestAsync(Request.Body);

            var result = await _context.AddNewCommentAsync(postid, user, context);

            if (result != null)
            {
                return JsonConvert.SerializeObject(result);
            }
            else
            {
                return ControllersServices.ErrorMessage("Can't add new comment, sorry.");
            }
        }
        [HttpGet("[action]")]
        public async Task<string> GetComments([FromQuery] int postid)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }

            var result = await _context.GetCommentListAsync(postid);

            if (result != null)
            {
                return JsonConvert.SerializeObject(new { CommentsList = result });
            }
            else
            {
                return ControllersServices.ErrorMessage("Can't add new comment, sorry.");
            }
        }
        [HttpPost("[action]")]
        public async Task<string> CreateOrEdit([FromQuery] int postid, [FromBody] Post post)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }

            if (postid <= 0)
            {
                await _context.AddNewPostAsync(post, User.Identity.Name);
            }
            else
            {
                await _context.EditPostAsync(post, postid);
            }

            return "true";
        }
        [HttpDelete("[action]")]
        public async Task<string> DeleteCommentsList([FromQuery] int postid, [FromBody] List<int> commentsListId)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }

            await _context.DeleteCommentListAsync(postid, commentsListId);

            return "true";
        }

        [HttpDelete("[action]")]
        public async Task<string> DeletePost([FromQuery] int postid)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return ControllersServices.ErrorMessage("auth");
            }
            if (!User.IsInRole("Admin"))
            {
                return ControllersServices.ErrorMessage("Not allowed");
            }

            await _context.DeletePostAsync(postid);

            return "true";
        }
    }
}