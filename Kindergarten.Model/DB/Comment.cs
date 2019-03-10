using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Kindergarten.Model.Identity;

namespace Kindergarten.Model.DB
{
    public class Comment
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime Date { get; set; }

        [Required, ForeignKey(nameof(Post))]
        public int PostId { get; set; }
        public Post Post { get; set; }

        [Required, ForeignKey(nameof(ApplicationUser))]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
