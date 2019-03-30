using System;

namespace Kindergarten.Model.UI.Post
{
    public class PreviewPost
    {
        public int PostId { get; set; }
        public string Author { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string ImgUrl { get; set; }
        public int CommentCount { get; set; }
    }
}
