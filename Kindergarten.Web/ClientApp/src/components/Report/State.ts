// -----------------
//#region STATE

export interface IReportState {
  pending: boolean;
  errorInner: string;
  visitationReport?: IVisitationReport;
}
export interface IVisitationReport {
  visitationPerMonthReportRecordList: IVisitationPerMonthReport[];
  healthIndex: Number;
}

export interface IVisitationPerMonthReport {
  month: string;
  visitedCount: Number;
  visitedCountPercent: Number;
  diseasedCount: Number;
  diseasedCountPercent: Number;
  notVisitedCount: Number;
  notVisitedCountPercent: Number;
}

export const unloadedState: IReportState = {
  pending: false,
  errorInner: "",
};
//#endregion
