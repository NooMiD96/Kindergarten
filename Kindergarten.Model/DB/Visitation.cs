using Newtonsoft.Json;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Visitation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VisitationId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool Visited { get; set; }

        [Required, ForeignKey(nameof(Children))]
        public int ChildrenId { get; set; }

        public Children Children { get; set; }
    }
}
