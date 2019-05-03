import * as React from "react";

import { Typography, Table } from "@core/antd";
import { IVaccinationPerTypeReport, IVaccinationReport } from "../State";
import { ColumnProps } from "antd/es/table/interface";

const { Title, Text } = Typography;

type TProps = {
  report?: IVaccinationReport;
};

type TState = {

};

export default class VaccinationReport extends React.PureComponent<TProps, TState> {
  state: TState = {
  };

  columns: ColumnProps<IVaccinationPerTypeReport>[] = [
    {
      title: "Набор вакцинаций",
      dataIndex: "type",
    },
    {
      title: "Кол-во воспитанников, %",
      dataIndex: "percent",
      render: (val: Number) => val.toFixed(4),
    },
  ];

  render() {
    const { report } = this.props;
    if (!report) {
      return <div />;
    }

    const pagination = {
      defaultCurrent: 1,
      defaultPageSize: 25,
      pageSize: 25,
      total: report.vaccinationPerTypeReport.length,
      hideOnSinglePage: true,
    };

    return (
      <React.Fragment>
        <div>
          <Text>
            Основой данной работы является наличие полной и достоверной информации о здоровье детей, посещающих ДОУ. Для своевременного учета детей, подлежащих вакцинации, ведется журнал учета профилактических прививок. Журнал на текущий год планируется в соответствии с национальным календарем профилактических прививок, утв. приказом Минздравсоцразвития России от 31.01.2011 № 51н "Об утверждении национального календаря профилактических прививок и календаря профилактических прививок по эпидемическим показаниям". Данные о вакцинации в ____ г. приведены в таблице.
            Вакцинация воспитанников МДОУ "Детский сад № __ «_________»" в _____ году.
          </Text>
        </div>
        <Table
          dataSource={report.vaccinationPerTypeReport}
          columns={this.columns}
          rowKey={(row: IVaccinationPerTypeReport) => row.type}
          pagination={pagination}
        />
      </React.Fragment>
    );
  }
}
