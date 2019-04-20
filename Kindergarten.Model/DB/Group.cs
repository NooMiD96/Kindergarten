using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Group : IEquatable<Group>
    {
        /// <summary>
        /// Номер группы
        /// </summary>
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GroupId { get; set; }

        /// <summary>
        /// Наименование группы
        /// </summary>
        [Required]
        public string GroupName { get; set; }

        /// <summary>
        /// Список детей относящихся к данной группе
        /// </summary>
        public ICollection<Children> ChildrenList { get; set; }

        public bool Equals(Group item) => this.GroupId == item.GroupId ? true : false;
    }
}
