import { IChildren } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_CHILDREN_REQUEST = "GET_CHILDREN_REQUEST";
export const GET_CHILDREN_REQUEST_SUCCESS = "GET_CHILDREN_REQUEST_SUCCESS";
export const GET_CHILDREN_REQUEST_ERROR = "GET_CHILDREN_REQUEST_ERROR";
export const CHANGE_CHILDREN_REQUEST = "CHANGE_CHILDREN_REQUEST";
export const CHANGE_CHILDREN_REQUEST_SUCCESS = "CHANGE_CHILDREN_REQUEST_SUCCESS";
export const CHANGE_CHILDREN_REQUEST_ERROR = "CHANGE_CHILDREN_REQUEST_ERROR";
export const DELETE_CHILDREN_REQUEST = "DELETE_CHILDREN_REQUEST";
export const DELETE_CHILDREN_REQUEST_SUCCESS = "DELETE_CHILDREN_REQUEST_SUCCESS";
export const DELETE_CHILDREN_REQUEST_ERROR = "DELETE_CHILDREN_REQUEST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface IGetChildrenRequestAction { type: typeof GET_CHILDREN_REQUEST; }
export interface IGetChildrenRequestSuccessAction { type: typeof GET_CHILDREN_REQUEST_SUCCESS; children: IChildren; }
export interface IGetChildrenRequestErrorAction { type: typeof GET_CHILDREN_REQUEST_ERROR; errorMessage: string; }
export type TGetChildren = IGetChildrenRequestAction | IGetChildrenRequestSuccessAction | IGetChildrenRequestErrorAction;

export interface IChangeChildrenRequestAction { type: typeof CHANGE_CHILDREN_REQUEST; }
export interface IChangeChildrenRequestSuccessAction { type: typeof CHANGE_CHILDREN_REQUEST_SUCCESS; }
export interface IChangeChildrenRequestErrorAction { type: typeof CHANGE_CHILDREN_REQUEST_ERROR; errorMessage: string; }
export type TChangeChildren = IChangeChildrenRequestAction | IChangeChildrenRequestSuccessAction | IChangeChildrenRequestErrorAction;

export interface IDeleteChildrenRequestAction { type: typeof DELETE_CHILDREN_REQUEST; }
export interface IDeleteChildrenRequestSuccessAction { type: typeof DELETE_CHILDREN_REQUEST_SUCCESS; }
export interface IDeleteChildrenRequestErrorAction { type: typeof DELETE_CHILDREN_REQUEST_ERROR; errorMessage: string; }
export type TDeleteChildren = IDeleteChildrenRequestAction | IDeleteChildrenRequestSuccessAction | IDeleteChildrenRequestErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetChildren | TChangeChildren | TDeleteChildren | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
