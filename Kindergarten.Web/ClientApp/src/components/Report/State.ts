import { IHealthGroup } from "@components/Children/State";

// -----------------
//#region STATE

export interface IReportState {
  pending: boolean;
  errorInner: string;
  visitationReport?: IVisitationReport;
  vaccinationReport?: IVaccinationReport;
  healthGroupReport?: IHealthGroupReport;
}

//#region Visitation
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
//#endregion
//#region Vaccination
export interface IVaccinationReport {
  vaccinationPerTypeReport: IVaccinationPerTypeReport[];
}

export interface IVaccinationPerTypeReport {
  type: string;
  percent: number;
}
//#endregion
//#region HealthGroup
export interface IHealthGroupReport {
  healthGroupList: IHealthGroup[];
  perHealthGroupRecordList: IPerHealthGroupRecord[];
}

export interface IPerHealthGroupRecord {
  group1: string;
  group2: string;
  group3: string;
  group4: string;
  group5: string;
}
//#endregion

export const unloadedState: IReportState = {
  pending: false,
  errorInner: "",
};
//#endregion
