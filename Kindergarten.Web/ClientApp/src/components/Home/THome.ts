import { RouteComponentProps } from "react-router-dom";

import { IHomeState } from "./State";
import { ActionCreators } from "./actions";

import { FormComponentProps } from "@core/antd/Form";
import { UserTypeEnums } from "@core/constants";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = { };
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IHomeState & FormComponentProps & {
    userRole: UserTypeEnums,
} & RouteComponentProps;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
    & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof ActionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
    & TMapDispatchToProps;
// -----------------------------
// MODELS
