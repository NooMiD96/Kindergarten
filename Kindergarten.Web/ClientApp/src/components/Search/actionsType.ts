import { IChildren } from "@components/Children/State";
// -----------------
//#region ACTIONS TYPE
export const SEARCH_CHILDREN_LIST_REQUEST = "SEARCH_CHILDREN_LIST_REQUEST";
export const SEARCH_CHILDREN_LIST_REQUEST_SUCCESS = "SEARCH_CHILDREN_LIST_REQUEST_SUCCESS";
export const SEARCH_CHILDREN_LIST_REQUEST_ERROR = "SEARCH_CHILDREN_LIST_REQUEST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface ISearchChildrenListRequestAction { type: typeof SEARCH_CHILDREN_LIST_REQUEST; }
export interface ISearchChildrenListRequestSuccessAction { type: typeof SEARCH_CHILDREN_LIST_REQUEST_SUCCESS; childrenList: IChildren[]; }
export interface ISearchChildrenListRequestErrorAction { type: typeof SEARCH_CHILDREN_LIST_REQUEST_ERROR; errorMessage: string; }
export type TSearchChildrenList = ISearchChildrenListRequestAction | ISearchChildrenListRequestSuccessAction | ISearchChildrenListRequestErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TSearchChildrenList | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
