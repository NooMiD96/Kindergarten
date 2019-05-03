import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Button } from "@core/antd";

import { TState, TComponentState, ReportTypeEnum } from "@components/Report/TReport";
import VaccinationReport from "./VaccinationReport";
import VisitationReport from "./VisitationReport";
import HealthGroupReport from "./HealthGroupReport";

export class Report extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    selectedReport: ReportTypeEnum.default,
  };

  getJsxReport = (selectedReport: ReportTypeEnum) => {
    switch (selectedReport) {
      case ReportTypeEnum.visitation:
        return (
          <VisitationReport
            report={this.props.visitationReport}
          />
        );

      case ReportTypeEnum.vaccination:
        return (
          <VaccinationReport
            report={this.props.vaccinationReport}
          />
        );

      case ReportTypeEnum.healthGroup:
        return (
          <HealthGroupReport
            report={this.props.healthGroupReport}
          />
        );

      case ReportTypeEnum.default:
      default:
        return <div />;
    }
  }

  onVisitationReport = () => {
    this.props.getVisitationReport();
    this.setState({
      selectedReport: ReportTypeEnum.visitation,
    });
  }
  onVaccinationReport = () => {
    this.props.getVaccinationReport();
    this.setState({
      selectedReport: ReportTypeEnum.vaccination,
    });
  }
  onHealthGroupReport = () => {
    this.props.getHealthGroupReport();
    this.setState({
      selectedReport: ReportTypeEnum.healthGroup,
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
            message="Ошибка"
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
          <Button onClick={this.onHealthGroupReport}>Группы здоровья</Button>
          {report}
        </Spin>
      </React.Fragment>
    );
  }
}
