// -----------------
//#region STATE
export interface IMedicamentState {
  medicamentList: IMedicament[];
  pending: boolean;
  errorInner: string;
}
export interface IMedicament {
  medicamentId: number;
  name: string;
  count: number;
  expirationDate: Date;
  comment: string;
}

export const unloadedState: IMedicamentState = {
  medicamentList: [],
  pending: false,
  errorInner: "",
};
//#endregion
