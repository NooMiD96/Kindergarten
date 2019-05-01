using System.Collections.Generic;

namespace Model.ViewModel.Report
{
    public class VaccinationReportRecord
    {
        public IEnumerable<VaccinationPerTypeReport> VaccinationPerTypeReport { get; set; }
    }

    public class VaccinationPerTypeReport
    {
        public string Type { get; set; }
        public double Percent { get; set; }
    }
}
