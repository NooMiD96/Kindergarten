import { IVisitationReport, IVaccinationReport } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_VISITATION_REPORT_REQUEST = "GET_VISITATION_REPORT_REQUEST";
export const GET_VISITATION_REPORT_REQUEST_SUCCESS = "GET_VISITATION_REPORT_REQUEST_SUCCESS";
export const GET_VISITATION_REPORT_REQUEST_ERROR = "GET_VISITATION_REPORT_REQUEST_ERROR";

export const GET_VACCINATION_REPORT_REQUEST = "GET_VACCINATION_REPORT_REQUEST";
export const GET_VACCINATION_REPORT_REQUEST_SUCCESS = "GET_VACCINATION_REPORT_REQUEST_SUCCESS";
export const GET_VACCINATION_REPORT_REQUEST_ERROR = "GET_VACCINATION_REPORT_REQUEST_ERROR";

export const CHANGE_TARGET_LIST = "CHANGE_TARGET_LIST";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface IGetVisitationReportRequestAction { type: typeof GET_VISITATION_REPORT_REQUEST; }
export interface IGetVisitationReportRequestSuccessAction { type: typeof GET_VISITATION_REPORT_REQUEST_SUCCESS; visitationReport: IVisitationReport; }
export interface IGetVisitationReportRequestErrorAction { type: typeof GET_VISITATION_REPORT_REQUEST_ERROR; errorMessage: string; }
export type TGetVisitationReport = IGetVisitationReportRequestAction | IGetVisitationReportRequestSuccessAction | IGetVisitationReportRequestErrorAction;

export interface IGetVaccinationReportRequestAction { type: typeof GET_VACCINATION_REPORT_REQUEST; }
export interface IGetVaccinationReportRequestSuccessAction { type: typeof GET_VACCINATION_REPORT_REQUEST_SUCCESS; vaccinationReport: IVaccinationReport; }
export interface IGetVaccinationReportRequestErrorAction { type: typeof GET_VACCINATION_REPORT_REQUEST_ERROR; errorMessage: string; }
export type TGetVaccinationReport = IGetVaccinationReportRequestAction | IGetVaccinationReportRequestSuccessAction | IGetVaccinationReportRequestErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetVisitationReport | TGetVaccinationReport | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
