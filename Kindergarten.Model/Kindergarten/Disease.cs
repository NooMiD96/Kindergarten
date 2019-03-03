using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kindergarten.Model.Kindergarten
{
    public class Symptom
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SymptomId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
