using Model.Identity;

using Newtonsoft.Json;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class HealthGroup
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int HealthGroupId { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
