// -----------------
//#region STATE
import { IChildren } from "@components/Children/State";
import { Moment } from "moment";

export interface IVisitationState {
  visitationList: IVisitation[];
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
  pending: false,
  errorInner: "",
};
//#endregion
