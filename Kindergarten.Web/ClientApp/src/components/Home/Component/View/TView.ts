import { RouteComponentProps } from "react-router-dom";

import { PostViewState } from "./State";
import { ActionCreators } from "./actions";

import { FormComponentProps } from "@core/antd/Form";
import { UserTypeEnums } from "@core/constants";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = { checkedList: any };
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = PostViewState & FormComponentProps & {
    userName?: string,
    userRole: UserTypeEnums,
} & RouteComponentProps<{id: string}>;
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
