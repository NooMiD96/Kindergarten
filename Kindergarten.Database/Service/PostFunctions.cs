using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Kindergarten.Model.DB;
using Kindergarten.Model.Identity;
using Kindergarten.Model.UI.Post;

using Microsoft.EntityFrameworkCore;

namespace Kindergarten.Database.Contexts
{
    public partial class KindergartenContext
    {
        public async Task<(ICollection<PreviewPost> PostList, int TotalCount)> GetPreviewPostListAsync(int page, int pageSize)
        {
            page = page < 0 ? 0 : page;
            pageSize = pageSize <= 0 ? 1 : pageSize;

            return (
                await Post
                    .OrderBy(p => p.PostId)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(item => new PreviewPost()
                    {
                        Author = item.User.UserName,
                        CommentsCount = item.CommentList.Count,
                        Date = item.Date,
                        Header = item.Header,
                        PostId = item.PostId,
                        ImgUrl = item.ImgUrl
                    })
                    .ToListAsync(),
                await Post.CountAsync()
            );
        }

        public async Task<Post> GetPostAsync(int postId) => await Post
            .Include(post => post.CommentList)
            .FirstOrDefaultAsync(post => post.PostId == postId);

        public IEnumerable<Post> GetAllPost() => Post
            .Include(p => p.CommentList)
            .AsEnumerable();

        public async Task<ICollection<Comment>> GetCommentListAsync(int postId)
        {
            var post = await Post.FirstOrDefaultAsync(p => p.PostId == postId);

            if (post == null)
                return null;

            await Entry(post)
                .Collection(p => p.CommentList)
                .LoadAsync();

            return post.CommentList.ToList();
        }

        /// <summary>
        /// </summary>
        /// <param name="postList"></param>
        /// <param name="type">0 - add new, 1 - edit, 2 - skip</param>
        /// <returns></returns>
        public async ValueTask<bool> ChangePostListAsync(List<Post> postList, int type)
        {
            var contextPostList = await Post.AsNoTracking().ToListAsync();

            switch (type)
            {
                case 0:
                    postList.ForEach(post => post.PostId = 0);

                    Post.AddRange(postList.AsEnumerable());

                    break;

                case 1:
                    var index = -1;
                    foreach (var post in postList)
                    {
                        index = contextPostList.IndexOf(post);

                        if (index != -1)
                        {
                            contextPostList[index] = post;
                            Post.Update(contextPostList[index]);
                        }
                        else
                        {
                            post.PostId = 0;
                            Post.Add(post);
                        }
                    }

                    break;

                case 2:
                    foreach (var post in postList)
                        if (!contextPostList.Contains(post))
                        {
                            post.PostId = 0;
                            Post.Add(post);
                        }

                    break;

                default:
                    break;
            }

            await SaveChangesAsync();

            return true;
        }

        public async Task<Comment> AddNewCommentAsync(int postId, ApplicationUser user, string commentInner)
        {
            var date = DateTime.UtcNow;
            var post = await Post
                .Where(p => p.PostId == postId)
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return null;
            }

            var comment = new Comment()
            {
                Content = commentInner,
                Date = date,
                UserId = user.Id,
            };

            post.CommentList.Add(comment);

            await SaveChangesAsync();

            return comment;
        }

        public async Task AddNewPostAsync(Post post, ApplicationUser user)
        {
            post.PostId = 0;
            post.UserId = user.Id;
            post.Date = DateTime.UtcNow;

            Post.Add(post);

            await SaveChangesAsync();
        }

        public async Task EditPostAsync(Post post, int postId)
        {
            var contextPost = await Post
                .Where(p => p.PostId == postId)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (contextPost == null)
            {
                return;
            }

            contextPost.Header = post.Header;
            contextPost.Content = post.Content;
            contextPost.ImgUrl = post.ImgUrl;

            Post.Update(contextPost);

            await SaveChangesAsync();
        }

        public async Task DeletePostAsync(int postId)
        {
            var contextPost = await Post
                .FirstOrDefaultAsync(p => p.PostId == postId);

            if (contextPost == null)
                return;

            Post.Remove(contextPost);

            await SaveChangesAsync();
        }
        public async Task DeleteCommentListAsync(int postId, List<int> commentListId)
        {
            var post = await Post.FirstOrDefaultAsync(p => p.PostId == postId);

            if (post == null)
                return;

            await Entry(post)
                .Collection(p => p.CommentList)
                .LoadAsync();

            var commentListToDelete = post.CommentList.Where(x => commentListId.Contains(x.CommentId));

            Comment.RemoveRange(commentListToDelete);

            await SaveChangesAsync();
        }
    }
}
