using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Kindergarten.Model.Identity;

namespace Kindergarten.Model.DB
{
    public class Comment
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }

        /// <summary>
        /// Содержимое комментария
        /// </summary>
        [Required]
        public string Content { get; set; }
        /// <summary>
        /// Дата создания комментария
        /// </summary>
        [Required]
        public DateTime Date { get; set; }

        /// <summary>
        /// ID поста, к которому относится комментарий
        /// </summary>
        [Required, ForeignKey(nameof(Post))]
        public int PostId { get; set; }
        /// <summary>
        /// Пост комментария
        /// </summary>
        public Post Post { get; set; }

        /// <summary>
        /// ID пользователя, оставившего комент
        /// </summary>
        [Required, ForeignKey(nameof(ApplicationUser))]
        public string UserId { get; set; }
        /// <summary>
        /// Юзер
        /// </summary>
        public ApplicationUser User { get; set; }
    }
}
