using Model.Identity;

using Newtonsoft.Json;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Children : IEquatable<Children>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChildrenId { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string SecondName { get; set; }

        [Required, ForeignKey(nameof(Group)), JsonIgnore]
        public int GroupId { get; set; }
        [JsonIgnore]
        public Group Group { get; set; }

        [ForeignKey(nameof(ApplicationUser)), JsonIgnore]
        public string ParentId { get; set; }
        [JsonIgnore]
        public ApplicationUser Parent { get; set; }

        public ChildrenInformation ChildrenInformation { get; set; }

        public bool Equals(Children item) => this.ChildrenId == item.ChildrenId ? true : false;
    }

    public class ChildrenInformation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None), ForeignKey(nameof(Children))]
        public int ChildrenId { get; set; }

        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public bool Male { get; set; }
        [Required]
        public string FatherName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required, Phone]
        public string PhoneNumber { get; set; }
        [Phone]
        public string PhoneNumber2 { get; set; }

        [Required]
        public bool FirstVaccination { get; set; }
        [Required]
        public bool ApproveFirstVaccination { get; set; }

        [Required]
        public bool SecondVaccination { get; set; }
        [Required]
        public bool ApproveSecondVaccination { get; set; }

        [Required]
        public bool ThirdVaccination { get; set; }
        [Required]
        public bool ApproveThirdVaccination { get; set; }

        [Required]
        public bool FourthVaccination { get; set; }
        [Required]
        public bool ApproveFourthVaccination { get; set; }

        [JsonIgnore]
        public Children Children { get; set; }
    }
}
