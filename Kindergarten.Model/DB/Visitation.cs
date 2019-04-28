using Newtonsoft.Json;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Visitation : VisitationBase
    {
        public Visitation() : base() {}
        public Visitation(VisitationBase visitation)
        {
            this.ChildrenId = visitation.ChildrenId;
            this.Date = visitation.Date;
            this.Visited = visitation.Visited;
            this.Diseased = visitation.Diseased;
        }
        public Children Children { get; set; }
    }

    public class VisitationBase : IEquatable<VisitationBase>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VisitationId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool Visited { get; set; }

        [Required]
        public bool Diseased { get; set; }

        [Required, ForeignKey(nameof(Children))]
        public int ChildrenId { get; set; }

        public bool Equals(VisitationBase item) => this.ChildrenId == item.ChildrenId && this.Date.Equals(item.Date) ? true : false;
    }
}
