import { ChatState } from "./State";
import { ActionCreators } from "./actions";
import { RouteComponentProps } from "react-router";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
    message: string,
    color: string,
    isAutoscroll: boolean,
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ChatState & {
    userName?: string;
};
export type TOwnProps = RouteComponentProps<{}>;
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
