import { RouteComponentProps } from "react-router-dom";

import { IChildrenState } from "./State";
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
    lastSendedType: SendTypeEnum,
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IChildrenState & {
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
