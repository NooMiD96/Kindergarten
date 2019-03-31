using Model.DB;

using Newtonsoft.Json;

using System.Collections.Generic;
using System.Linq;

namespace Model.ViewModel.PostViewModel
{
    public class PostViewModel : PostBase
    {
        public PostViewModel(Post post)
        {
            this.PostId = post.PostId;
            this.Header = post.Header;
            this.Date = post.Date;
            this.Content = post.Content;
            this.ImgUrl = post.ImgUrl;

            this.CommentList = post.CommentList.Select(x => new CommentViewModel(x));
        }

        [JsonProperty(Required = Required.Always)]
        public new IEnumerable<CommentViewModel> CommentList { get; set; }
    }
}
