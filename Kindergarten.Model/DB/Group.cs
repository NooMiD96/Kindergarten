using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kindergarten.Model.DB
{
    public class Group
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
    }
}
