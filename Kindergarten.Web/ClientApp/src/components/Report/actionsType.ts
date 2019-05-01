import { IVisitationReport } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_VISITATION_REPORT_REQUEST = "GET_VISITATION_REPORT_REQUEST";
export const GET_VISITATION_REPORT_REQUEST_SUCCESS = "GET_VISITATION_REPORT_REQUEST_SUCCESS";
export const GET_VISITATION_REPORT_REQUEST_ERROR = "GET_VISITATION_REPORT_REQUEST_ERROR";

export const CHANGE_TARGET_LIST = "CHANGE_TARGET_LIST";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface IGetVisitationReportRequestAction { type: typeof GET_VISITATION_REPORT_REQUEST; }
export interface IGetVisitationReportRequestSuccessAction { type: typeof GET_VISITATION_REPORT_REQUEST_SUCCESS; visitationReport: IVisitationReport; }
export interface IGetVisitationReportRequestErrorAction { type: typeof GET_VISITATION_REPORT_REQUEST_ERROR; errorMessage: string; }
export type TGetVisitationReport = IGetVisitationReportRequestAction | IGetVisitationReportRequestSuccessAction | IGetVisitationReportRequestErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetVisitationReport | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
