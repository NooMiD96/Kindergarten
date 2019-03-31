using Model.DB;

using Newtonsoft.Json;

namespace Model.UI.Post
{
    public class PreviewPostViewModel : PostBase
    {
        [JsonRequired]
        public string Author { get; set; }
        [JsonRequired]
        public int CommentCount { get; set; }
    }
}
