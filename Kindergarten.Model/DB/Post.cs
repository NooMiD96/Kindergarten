using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Kindergarten.Model.Identity;

namespace Kindergarten.Model.DB
{
    public class Post : IEquatable<Post>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PostId { get; set; }

        [Required]
        public string Header { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public string ImgUrl { get; set; }

        //childrens
        public ICollection<Comment> CommentList { get; set; } = new List<Comment>();

        [Required, ForeignKey(nameof(ApplicationUser))]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public bool Equals(Post item)
        {
            if (this.PostId == item.PostId)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
