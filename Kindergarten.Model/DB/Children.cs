using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Kindergarten.Model.Identity;

namespace Kindergarten.Model.DB
{
    public class Children
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChildrenId { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string SecondName { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public bool Male { get; set; }

        [Required, ForeignKey(nameof(Group))]
        public int GroupId { get; set; }
        public Group Group { get; set; }

        [Required, ForeignKey(nameof(ApplicationUser))]
        public string ParentId { get; set; }
        public ApplicationUser Parent { get; set; }
    }
}
