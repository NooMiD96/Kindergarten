import * as React from "react";

import { Typography, Table } from "@core/antd";
import { IHealthGroupReport, IPerHealthGroupRecord } from "../State";
import { ColumnProps } from "antd/es/table/interface";
import { IHealthGroup } from "@src/components/Children/State";

const { Title } = Typography;

type TProps = {
  report?: IHealthGroupReport;
};

type TState = {

};

export default class HealthGroupReport extends React.PureComponent<TProps, TState> {
  state: TState = {
  };

  columns: (healthGroups: IHealthGroup[]) => ColumnProps<IPerHealthGroupRecord>[] = (healthGroups) => [
    {
      title: healthGroups[0].description,
      dataIndex: `group${healthGroups[0].number}`,
      width: 150,
      render: (val?: string) => val ? val : "",
    },
    {
      title: healthGroups[1].description,
      dataIndex: `group${healthGroups[1].number}`,
      width: 150,
      render: (val?: string) => val ? val : "",
    },
    {
      title: healthGroups[2].description,
      dataIndex: `group${healthGroups[2].number}`,
      width: 150,
      render: (val?: string) => val ? val : "",
    },
    {
      title: healthGroups[3].description,
      dataIndex: `group${healthGroups[3].number}`,
      width: 150,
      render: (val?: string) => val ? val : "",
    },
    {
      title: healthGroups[4].description,
      dataIndex: `group${healthGroups[4].number}`,
      width: 150,
      render: (val?: string) => val ? val : "",
    },
  ]

  render() {
    const { report } = this.props;
    if (!report) {
      return <div />;
    }

    const pagination = {
      defaultCurrent: 1,
      defaultPageSize: 200,
      pageSize: 200,
      total: report.perHealthGroupRecordList.length,
      hideOnSinglePage: true,
    };

    return (
      <React.Fragment>
        <Title>Группы здоровья</Title>
        <Table
          dataSource={report.perHealthGroupRecordList}
          columns={this.columns(report.healthGroupList)}
          rowKey={(_: IPerHealthGroupRecord, index: number) => index.toString()}
          pagination={pagination}
          scroll={{y: 900}}
        />
      </React.Fragment>
    );
  }
}
