// -----------------
//#region STATE

export interface IReportState {
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IReportState = {
  pending: false,
  errorInner: "",
};
//#endregion
