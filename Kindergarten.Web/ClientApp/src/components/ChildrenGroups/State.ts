// -----------------
//#region STATE
import { IGroupState } from "@components/Group/State";

export interface IChildrenGroupsState {
  childrenGroupsList: IGroupState[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IChildrenGroupsState = {
  childrenGroupsList: [],
  pending: false,
  errorInner: "",
};
//#endregion
