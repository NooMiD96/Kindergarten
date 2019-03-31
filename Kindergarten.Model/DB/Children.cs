using Model.Identity;

using Newtonsoft.Json;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Children
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), ForeignKey(nameof(ChildrenInformation))]
        public int ChildrenId { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string SecondName { get; set; }

        [Required, ForeignKey(nameof(Group)), JsonIgnore]
        public int GroupId { get; set; }
        [JsonIgnore]
        public Group Group { get; set; }

        [Required, ForeignKey(nameof(ApplicationUser)), JsonIgnore]
        public string ParentId { get; set; }
        [JsonIgnore]
        public ApplicationUser Parent { get; set; }

        [JsonIgnore]
        public ChildrenInformation ChildrenInformation { get; set; }
    }

    public class ChildrenInformation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ChildrenId { get; set; }

        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public bool Male { get; set; }

        [JsonIgnore]
        public Children Children { get; set; }
    }
}
