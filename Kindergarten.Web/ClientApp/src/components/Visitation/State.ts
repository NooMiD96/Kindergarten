// -----------------
//#region STATE
import { IChildren } from "@components/Children/State";
import { TransferItem } from "@core/antd/Transfer";
import { Moment } from "moment";

export interface IVisitationState {
  visitationList: IVisitation[];
  transferData: TransferItem[],
  targetKeys: string[],
  pending: boolean;
  errorInner: string;
}

export interface IVisitation {
  visitationId: Number;
  date: Moment;
  visited: Boolean;
  childrenId: Number;
  children: IChildren;
}

export const unloadedState: IVisitationState = {
  visitationList: [],
  transferData: [],
  targetKeys: [],
  pending: false,
  errorInner: "",
};
//#endregion
