using Model.Identity;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    /// <summary>
    /// Модель единицы публикации
    /// </summary>
    public class Post : PostBase
    {
        public Post() : base() { }
        public Post(PostBase post)
        {
            this.PostId = post.PostId;
            this.Header = post.Header;
            this.Content = post.Content;
            this.Date = post.Date;
            this.ImgUrl = post.ImgUrl;
            this.CommentList = post.CommentList;
            this.UserId = null;
            this.User = null;
        }
        /// <summary>
        /// Ссылка на пользователя
        /// </summary>
        [Required, ForeignKey(nameof(ApplicationUser))]
        [JsonIgnore]
        public string UserId { get; set; }
        /// <summary>
        /// Пользователь
        /// </summary>
        [JsonIgnore]
        public ApplicationUser User { get; set; }
    }

    public class PostBase : IEquatable<Post>
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

        /// <summary>
        /// Список комментариев поста
        /// </summary>
        public ICollection<Comment> CommentList { get; set; } = new List<Comment>();

        public bool Equals(Post item) => this.PostId == item.PostId ? true : false;
    }
}
