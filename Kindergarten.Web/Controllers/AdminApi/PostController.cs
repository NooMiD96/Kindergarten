﻿using Kindergarten.Core.Constants;
using Kindergarten.Database.Contexts;
using Kindergarten.Model.DB;
using Kindergarten.Model.Identity;
using Kindergarten.Web.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMedicine.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
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

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateOrEdit([FromQuery] int postId, [FromBody] Post post)
        {
            var user = await _userManager.GetUserAsync(User);

            if (postId <= 0)
            {
                await _context.AddNewPostAsync(post, user);
            }
            else
            {
                await _context.EditPostAsync(post, postId);
            }

            return Ok();
        }
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteCommentList([FromQuery] int postId, [FromBody] List<int> commentListId)
        {
            await _context.DeleteCommentListAsync(postId, commentListId);

            return Ok();
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeletePost([FromQuery] int postId)
        {
            await _context.DeletePostAsync(postId);

            return Ok();
        }
    }
}