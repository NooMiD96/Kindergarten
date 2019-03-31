using Model.Identity;

using Newtonsoft.Json;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Comment : CommentBase
    {
        /// <summary>
        /// ID поста, к которому относится комментарий
        /// </summary>
        [Required, ForeignKey(nameof(Post)), JsonIgnore]
        public int PostId { get; set; }
        /// <summary>
        /// Пост комментария
        /// </summary>
        [JsonIgnore]
        public Post Post { get; set; }

        /// <summary>
        /// ID пользователя, оставившего комент
        /// </summary>
        [Required, ForeignKey(nameof(ApplicationUser)), JsonIgnore]
        public string UserId { get; set; }
        /// <summary>
        /// Юзер
        /// </summary>
        [JsonIgnore]
        public ApplicationUser User { get; set; }
    }

    public class CommentBase
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
    }
}
