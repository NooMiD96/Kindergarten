using Model.DB;

using Newtonsoft.Json;

namespace Model.ViewModel.PostViewModel
{
    public class CommentViewModel : CommentBase
    {
        public CommentViewModel(Comment comment)
        {
            this.CommentId = comment.CommentId;
            this.Content = comment.Content;
            this.Date = comment.Date;
            this.Author = comment.User.UserName;
        }

        [JsonRequired]
        public string Author { get; set; }
    }
}
