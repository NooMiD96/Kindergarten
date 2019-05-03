using Model.DB;

using System.Collections.Generic;

namespace Model.ViewModel.Report
{
    public class HealthGroupReportRecord
    {
        public IEnumerable<HealthGroup> HealthGroupList { get; set; }
        public IEnumerable<PerHealthGroupRecord> PerHealthGroupRecordList { get; set; }
    }

    public class PerHealthGroupRecord
    {
        public string Group1 { get; set; }
        public string Group2 { get; set; }
        public string Group3 { get; set; }
        public string Group4 { get; set; }
        public string Group5 { get; set; }
    }
}
