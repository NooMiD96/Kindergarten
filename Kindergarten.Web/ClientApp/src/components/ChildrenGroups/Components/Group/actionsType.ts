import { IChildren } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_CHILDREN_LIST_REQUEST = "GET_CHILDREN_LIST_REQUEST";
export const GET_CHILDREN_LIST_REQUEST_SUCCESS = "GET_CHILDREN_LIST_REQUEST_SUCCESS";
export const GET_CHILDREN_LIST_REQUEST_ERROR = "GET_CHILDREN_LIST_REQUEST_ERROR";

export const CHANGE_CHILDREN_LIST_REQUEST = "CHANGE_CHILDREN_LIST_REQUEST";
export const CHANGE_CHILDREN_LIST_REQUEST_SUCCESS = "CHANGE_CHILDREN_LIST_REQUEST_SUCCESS";
export const CHANGE_CHILDREN_LIST_REQUEST_ERROR = "CHANGE_CHILDREN_LIST_REQUEST_ERROR";

export const DELETE_CHILDREN_LIST_REQUEST = "DELETE_CHILDREN_LIST_REQUEST";
export const DELETE_CHILDREN_LIST_REQUEST_SUCCESS = "DELETE_CHILDREN_LIST_REQUEST_SUCCESS";
export const DELETE_CHILDREN_LIST_REQUEST_ERROR = "DELETE_CHILDREN_LIST_REQUEST_ERROR";

export const ADD_NEW_CHILDREN = "ADD_NEW_CHILDREN";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetChildrenListRequestAction { type: typeof GET_CHILDREN_LIST_REQUEST; }
export interface IGetChildrenListRequestSuccessAction { type: typeof GET_CHILDREN_LIST_REQUEST_SUCCESS; childrenList: IChildren[]; }
export interface IGetChildrenListRequestErrorAction { type: typeof GET_CHILDREN_LIST_REQUEST_ERROR; errorMessage: string; }
export type TGetChildrenList = IGetChildrenListRequestAction | IGetChildrenListRequestSuccessAction | IGetChildrenListRequestErrorAction;

export interface IChangeChildrenListRequestAction { type: typeof CHANGE_CHILDREN_LIST_REQUEST; }
export interface IChangeChildrenListRequestSuccessAction { type: typeof CHANGE_CHILDREN_LIST_REQUEST_SUCCESS; }
export interface IChangeChildrenListRequestErrorAction { type: typeof CHANGE_CHILDREN_LIST_REQUEST_ERROR; errorMessage: string; }
export type TChangeChildrenList = IChangeChildrenListRequestAction | IChangeChildrenListRequestSuccessAction | IChangeChildrenListRequestErrorAction;

export interface IDeleteChildrenListRequestAction { type: typeof DELETE_CHILDREN_LIST_REQUEST; }
export interface IDeleteChildrenListRequestSuccessAction { type: typeof DELETE_CHILDREN_LIST_REQUEST_SUCCESS; }
export interface IDeleteChildrenListRequestErrorAction { type: typeof DELETE_CHILDREN_LIST_REQUEST_ERROR; errorMessage: string; }
export type TDeleteChildrenList = IDeleteChildrenListRequestAction | IDeleteChildrenListRequestSuccessAction | IDeleteChildrenListRequestErrorAction;

export interface IAddNewChildrenAction { type: typeof ADD_NEW_CHILDREN; children: IChildren; }
export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetChildrenList | TChangeChildrenList | TDeleteChildrenList | IAddNewChildrenAction | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
