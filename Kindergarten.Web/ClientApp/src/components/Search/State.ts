// -----------------
//#region STATE
import { IChildren } from "@components/Children/State";

export interface ISearchState {
  childrenList: IChildren[];
  pending: boolean;
  errorInner: string;
}
export const unloadedState: ISearchState = {
  childrenList: [],
  pending: false,
  errorInner: "",
};
//#endregion
