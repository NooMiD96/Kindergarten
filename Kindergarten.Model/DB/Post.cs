using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Kindergarten.Model.Identity;

namespace Kindergarten.Model.DB
{
    /// <summary>
    /// Модель единицы публикации
    /// </summary>
    public class Post : IEquatable<Post>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PostId { get; set; }

        /// <summary>
        /// Заголовок поста
        /// </summary>
        [Required]
        public string Header { get; set; }
        /// <summary>
        /// Содержимое поста
        /// </summary>
        [Required]
        public string Content { get; set; }
        /// <summary>
        /// Дата публикации
        /// </summary>
        [Required]
        public DateTime Date { get; set; }
        /// <summary>
        /// Изображение
        /// </summary>
        public string ImgUrl { get; set; }

        #region Childrens

        /// <summary>
        /// Список комментариев поста
        /// </summary>
        public ICollection<Comment> CommentList { get; set; } = new List<Comment>();

        /// <summary>
        /// Ссылка на пользователя
        /// </summary>
        [Required, ForeignKey(nameof(ApplicationUser))]
        public string UserId { get; set; }
        /// <summary>
        /// Пользователь
        /// </summary>
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

        #endregion
    }
}
