// -----------------
//#region STATE
import { IChildren } from "./Components/Children/State";

export interface IGroupState {
  groupId: number;
  groupName: string;
  childrenList: IChildren[];
  pending: boolean;
  errorInner: string;
}

export { IChildren };

export const unloadedState: IGroupState = {
  groupId: 0,
  groupName: "",
  childrenList: [],
  pending: false,
  errorInner: "",
};
//#endregion
