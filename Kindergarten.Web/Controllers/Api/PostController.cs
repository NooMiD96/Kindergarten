﻿using Kindergarten.Core.Helpers;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.Identity;
using Kindergarten.Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using MyMedicine.Controllers.Services;

using System.Threading.Tasks;

namespace MyMedicine.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : BaseController
    {
        private readonly KindergartenContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostController([FromServices] KindergartenContext context, [FromServices] UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPreviewPostList([FromQuery] int page, [FromQuery] int pageSize)
        {
            var (PostList, TotalCount) = await _context.GetPreviewPostListAsync(page, pageSize);

            return Success(new { PostList, TotalCount });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPost([FromQuery] int postId)
        {
            var post = await _context.GetPostAsync(postId);

            return Success(post);
        }

        [Authorize, ValidateAntiForgeryToken]
        [HttpPost("[action]")]
        public async Task<IActionResult> AddComment([FromQuery] int postid)
        {
            var user = await _userManager.GetUserAsync(User);

            var context = await ControllersServices.GetJsonFromBodyRequestAsync(Request.Body);

            var result = await _context.AddNewCommentAsync(postid, user, context);

            if (result != null)
                return Success(result);
            else
            {
                return BadRequest("Не удалось добавить комментарий, повторите попытку позже.");
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCommentList([FromQuery] int postId)
        {
            var CommentList = await _context.GetCommentListAsync(postId);

            if (CommentList != null)
                return Success(CommentList);
            else
                return BadRequest("TODO");
        }
    }
}