using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Newtonsoft.Json;

namespace Kindergarten.Database.Models.Kindergarten
{
    public class FetcherData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey(nameof(Fetcher))]
        public int FetcherId { get; set; }

        [Required]
        public string Data { get; set; }

        // parent
        public Fetcher Fetcher { get; set; }
    }

    public class FetcherDataModel
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "data")]
        public string Data { get; set; }
    }
}
