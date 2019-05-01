using System;
using System.Collections.Generic;
using System.Text;

namespace Model.ViewModel.Report
{
    public class VisitationReportRecord
    {
        public IEnumerable<VisitationPerMonthReportRecord> VisitationPerMonthReportRecordList { get; set; }
        public double HealthIndex { get; set; }
    }

    public class VisitationPerMonthReportRecord
    {
        /// <summary>
        /// Месяц
        /// </summary>
        public string Month { get; set; }
        /// <summary>
        /// Количество посещений. Среднее посещение детей за месяц
        /// </summary>
        public double VisitedCount { get; set; }
        /// <summary>
        /// Процентное соотношение. Считаем среднее посещение детей за месяц, делим на общее кол-во детей
        /// </summary>
        public double VisitedCountPercent { get; set; }
        /// <summary>
        /// Пропущено по болезни. Среднее за месяц
        /// </summary>
        public double DiseasedCount { get; set; }
        /// <summary>
        /// По болезни(в %). Считаем среднее за месяц, делим на общее кол-во детей
        /// </summary>
        public double DiseasedCountPercent { get; set; }
        /// <summary>
        /// Пропущено по др.причинам. Среднее за месяц
        /// </summary>
        public double NotVisitedCount { get; set; }
        /// <summary>
        /// По др.причинам(в %). Считаем среднее за месяц, делим на общее кол-во детей
        /// </summary>
        public double NotVisitedCountPercent { get; set; }
    }
}
