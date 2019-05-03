import * as React from "react";

import { Typography, Table } from "@core/antd";
import { IVisitationReport, IVisitationPerMonthReport } from "../State";
import { ColumnProps } from "antd/es/table/interface";

const { Title, Text } = Typography;

type TProps = {
  report?: IVisitationReport;
};

type TState = {

};

export default class VisitationReport extends React.PureComponent<TProps, TState> {
  state: TState = {
  };

  columns: ColumnProps<IVisitationPerMonthReport>[] = [
    {
      title: "Месяц",
      dataIndex: "month",
      width: 150,
      fixed: "left",
    },
    {
      title: "Количество посещений",
      dataIndex: "visitedCount",
      width: 250,
      render: (val: Number) => val.toFixed(4),
    },
    {
      title: "Процентное соотношение",
      dataIndex: "visitedCountPercent",
      width: 250,
      render: (val: Number) => val.toFixed(4),
    },
    {
      title: "Пропущено по болезни",
      dataIndex: "diseasedCount",
      width: 250,
      render: (val: Number) => val.toFixed(4),
    },
    {
      title: "По болезни(в %)",
      dataIndex: "diseasedCountPercent",
      width: 200,
      render: (val: Number) => val.toFixed(4),
    },
    {
      title: "Пропущено по др.причинам",
      dataIndex: "notVisitedCount",
      width: 250,
      render: (val: Number) => val.toFixed(4),
    },
    {
      title: "По др.причинам(в %)",
      dataIndex: "notVisitedCountPercent",
      width: 200,
      render: (val: Number) => val.toFixed(4),
    },
  ];

  render() {
    const { report } = this.props;
    if (!report) {
      return <div />;
    }

    const averageReport = report.visitationPerMonthReportRecordList[report.visitationPerMonthReportRecordList.length - 1];

    const pagination = {
      defaultCurrent: 1,
      defaultPageSize: 25,
      pageSize: 25,
      total: report.visitationPerMonthReportRecordList.length,
      hideOnSinglePage: true,
    };

    return (
      <React.Fragment>
        <Title>Анализ посещаемости ДОУ за учебный год (в среднем, помесячно)</Title>
        <Table
          dataSource={report.visitationPerMonthReportRecordList}
          columns={this.columns}
          rowKey={(row: IVisitationPerMonthReport) => row.month}
          pagination={pagination}
          scroll={{x: 1600}}
        />
        <Title level={4}>
          Из таблицы анализа посещаемости ДОУ видно, что средняя посещаемость детей составляет {
            averageReport.visitedCountPercent ? averageReport.visitedCountPercent.toFixed(4) : 0
          }%.
        </Title>
        <Title level={4}>
          Индекс здоровья = {report.healthIndex.toFixed(2)}%
        </Title>
        <Text>
          (норма индекса здоровья – 15–40%)
        </Text>
      </React.Fragment>
    );
  }
}
