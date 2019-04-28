import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Button } from "@core/antd";

import { TState, TComponentState, ReportTypeEnum } from "@components/Report/TReport";
import VaccinationReport from "./VaccinationReport";
import VisitationReport from "./VisitationReport";

export class Report extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    selectedReport: ReportTypeEnum.default,
  };

  getJsxReport = (selectedReport: ReportTypeEnum) => {
    switch (selectedReport) {
      case ReportTypeEnum.visitation:
        return <VisitationReport />;

      case ReportTypeEnum.vaccination:
        return <VaccinationReport />;

      case ReportTypeEnum.default:
      default:
        return <div />;
    }
  }

  onVisitationReport = () => {
    this.setState({
      selectedReport: ReportTypeEnum.visitation,
    });
  }
  onVaccinationReport = () => {
    this.setState({
      selectedReport: ReportTypeEnum.vaccination,
    });
  }

  render() {
    const { errorInner, cleanErrorInner, pending } = this.props;
    const { selectedReport } = this.state;

    const report = this.getJsxReport(selectedReport);

    return (
      <React.Fragment>
        {
          errorInner && <Alert
            message="Error"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        }
        <Spin
          spinning={pending}
        >
          <Button onClick={this.onVisitationReport}>Отчёт посещаемости</Button>
          <Button onClick={this.onVaccinationReport}>Отчёт прививок</Button>
          {report}
        </Spin>
      </React.Fragment>
    );
  }
}
