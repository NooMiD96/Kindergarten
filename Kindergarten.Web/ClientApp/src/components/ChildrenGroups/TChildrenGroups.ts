import { RouteComponentProps } from "react-router-dom";

import { IChildrenGroupsState } from "./State";
import { IGroupState } from "@components/Group/State";
import { actionCreators } from "./actions";

import { UserTypeEnums } from "@core/constants";
// -----------------------------
// STATE OF COMPONENT
export enum SendTypeEnum {
    Edit,
    Delete,
    Default,
}

export type TComponentState = {
    lastCreateIndex: number,
    editList: IGroupState[],
    deleteList: string[],
    lastSendedType: SendTypeEnum,
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IChildrenGroupsState & {
    userRole: UserTypeEnums,
} & RouteComponentProps;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
    & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
    & TMapDispatchToProps;
// -----------------------------
// MODELS
