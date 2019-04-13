import { IMedicament } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_MEDICAMENT_LIST_REQUEST = "GET_MEDICAMENT_LIST_REQUEST";
export const GET_MEDICAMENT_LIST_REQUEST_SUCCESS = "GET_MEDICAMENT_LIST_REQUEST_SUCCESS";
export const GET_MEDICAMENT_LIST_REQUEST_ERROR = "GET_MEDICAMENT_LIST_REQUEST_ERROR";

export const CHANGE_MEDICAMENT_LIST_REQUEST = "CHANGE_MEDICAMENT_LIST_REQUEST";
export const CHANGE_MEDICAMENT_LIST_REQUEST_SUCCESS = "CHANGE_MEDICAMENT_LIST_REQUEST_SUCCESS";
export const CHANGE_MEDICAMENT_LIST_REQUEST_ERROR = "CHANGE_MEDICAMENT_LIST_REQUEST_ERROR";

export const DELETE_MEDICAMENT_LIST_REQUEST = "DELETE_MEDICAMENT_LIST_REQUEST";
export const DELETE_MEDICAMENT_LIST_REQUEST_SUCCESS = "DELETE_MEDICAMENT_LIST_REQUEST_SUCCESS";
export const DELETE_MEDICAMENT_LIST_REQUEST_ERROR = "DELETE_MEDICAMENT_LIST_REQUEST_ERROR";

export const ADD_NEW_MEDICAMENT = "ADD_NEW_MEDICAMENT";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface IGetMedicamentListRequestAction { type: typeof GET_MEDICAMENT_LIST_REQUEST; }
export interface IGetMedicamentListRequestSuccessAction { type: typeof GET_MEDICAMENT_LIST_REQUEST_SUCCESS; medicamentList: IMedicament[]; }
export interface IGetMedicamentListRequestErrorAction { type: typeof GET_MEDICAMENT_LIST_REQUEST_ERROR; errorMessage: string; }
export type TGetMedicamentList = IGetMedicamentListRequestAction | IGetMedicamentListRequestSuccessAction | IGetMedicamentListRequestErrorAction;

export interface IChangeMedicamentListRequestAction { type: typeof CHANGE_MEDICAMENT_LIST_REQUEST; }
export interface IChangeMedicamentListRequestSuccessAction { type: typeof CHANGE_MEDICAMENT_LIST_REQUEST_SUCCESS; }
export interface IChangeMedicamentListRequestErrorAction { type: typeof CHANGE_MEDICAMENT_LIST_REQUEST_ERROR; errorMessage: string; }
export type TChangeMedicamentList = IChangeMedicamentListRequestAction | IChangeMedicamentListRequestSuccessAction | IChangeMedicamentListRequestErrorAction;

export interface IDeleteMedicamentListRequestAction { type: typeof DELETE_MEDICAMENT_LIST_REQUEST; }
export interface IDeleteMedicamentListRequestSuccessAction { type: typeof DELETE_MEDICAMENT_LIST_REQUEST_SUCCESS; }
export interface IDeleteMedicamentListRequestErrorAction { type: typeof DELETE_MEDICAMENT_LIST_REQUEST_ERROR; errorMessage: string; }
export type TDeleteMedicamentList = IDeleteMedicamentListRequestAction | IDeleteMedicamentListRequestSuccessAction | IDeleteMedicamentListRequestErrorAction;

export interface IAddNewMedicamentAction { type: typeof ADD_NEW_MEDICAMENT; medicament: IMedicament; }
export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetMedicamentList | TChangeMedicamentList | TDeleteMedicamentList | IAddNewMedicamentAction | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
