import { IReportState } from "./State";
import { actionCreators } from "./actions";
// -----------------------------
// STATE OF COMPONENT
export enum ReportTypeEnum {
    default,
    visitation,
    vaccination,
    healthGroup,
}
export type TComponentState = {
    selectedReport: ReportTypeEnum;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IReportState;
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
