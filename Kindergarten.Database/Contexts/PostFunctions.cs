using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.Identity;
using Model.UI.Post;
using Model.ViewModel.PostViewModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Contexts
{
    public partial class KindergartenContext
    {
        public async Task<(ICollection<PreviewPostViewModel> PostList, int TotalCount)> GetPreviewPostListAsync(int page, int pageSize)
        {
            page = page < 0 ? 0 : page;
            pageSize = pageSize <= 0 ? 1 : pageSize;

            return (
                await Post
                    .OrderBy(p => p.PostId)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(item => new PreviewPostViewModel()
                    {
                        PostId = item.PostId,
                        Author = item.User.UserName,
                        Date = item.Date,
                        Header = item.Header,
                        Content = item.Content,
                        ImgUrl = item.ImgUrl,
                        CommentCount = item.CommentList.Count,
                    })
                    .ToListAsync(),
                await Post.CountAsync()
            );
        }

        private async Task<Post> GetPostAsync(int postId) => await Post
            .Include(post => post.CommentList)
            .ThenInclude(comment => comment.User)
            .FirstOrDefaultAsync(post => post.PostId == postId);

        public async Task<PostViewModel> GetPostViewModelAsync(int postId)
        {
            var post = await GetPostAsync(postId);
            return new PostViewModel(post);
        }

        public IEnumerable<Post> GetAllPost() => Post
            .Include(p => p.CommentList)
            .AsEnumerable();

        private async Task<IEnumerable<Comment>> GetCommentListAsync(int postId)
        {
            var post = await Post.FirstOrDefaultAsync(p => p.PostId == postId);

            if (post == null)
                return null;

            await Entry(post)
                .Collection(p => p.CommentList)
                .LoadAsync();

            return post.CommentList.ToList();
        }

        public async Task<IEnumerable<CommentViewModel>> GetCommentViewModelListAsync(int postId)
        {
            var post = await Post.FirstOrDefaultAsync(p => p.PostId == postId);

            if (post == null)
                return null;

            await Entry(post)
                .Collection(p => p.CommentList)
                .Query()
                .Include(x => x.User)
                .LoadAsync();

            return post.CommentList.Select(x => new CommentViewModel(x));
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

        public async Task<CommentViewModel> AddNewCommentAsync(int postId, ApplicationUser user, string commentInner)
        {
            var date = DateTime.UtcNow;
            var post = await Post.FirstOrDefaultAsync(p => p.PostId == postId);

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

            return new CommentViewModel(comment);
        }

        public async Task AddNewPostAsync(PostBase postBase, ApplicationUser user)
        {
            var post = new Post(postBase)
            {
                PostId = 0,
                UserId = user.Id,
                Date = DateTime.UtcNow,
            };

            Post.Add(post);

            await SaveChangesAsync();
        }

        public async Task EditPostAsync(PostBase postBase, int postId)
        {
            var contextPost = await Post.FirstOrDefaultAsync(p => p.PostId == postId);

            if (contextPost == null)
            {
                return;
            }

            contextPost.Header = postBase.Header;
            contextPost.Content = postBase.Content;
            contextPost.ImgUrl = postBase.ImgUrl;

            Post.Update(contextPost);

            await SaveChangesAsync();
        }

        public async ValueTask<bool> DeletePostAsync(int postId)
        {
            var contextPost = await Post
                .FirstOrDefaultAsync(p => p.PostId == postId);

            if (contextPost == null)
                return false;

            Post.Remove(contextPost);

            await SaveChangesAsync();

            return true;
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
