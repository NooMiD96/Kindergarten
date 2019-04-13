import { RouteComponentProps } from "react-router-dom";

import { IGroupState, IChildren } from "./State";
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
    editList: IChildren[],
    deleteList: string[],
    lastSendedType: SendTypeEnum,
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IGroupState & {
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
