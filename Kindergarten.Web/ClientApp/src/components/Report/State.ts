// -----------------
//#region STATE

export interface IReportState {
  pending: boolean;
  errorInner: string;
  visitationReport?: IVisitationReport;
  vaccinationReport?: IVaccinationReport;
}
export interface IVisitationReport {
  visitationPerMonthReportRecordList: IVisitationPerMonthReport[];
  healthIndex: number;
}

export interface IVisitationPerMonthReport {
  month: string;
  visitedCount: number;
  visitedCountPercent: number;
  diseasedCount: number;
  diseasedCountPercent: number;
  notVisitedCount: number;
  notVisitedCountPercent: number;
}

export interface IVaccinationReport {
  vaccinationPerTypeReport: IVaccinationPerTypeReport[];
}

export interface IVaccinationPerTypeReport {
  type: string;
  percent: number;
}

export const unloadedState: IReportState = {
  pending: false,
  errorInner: "",
};
//#endregion
