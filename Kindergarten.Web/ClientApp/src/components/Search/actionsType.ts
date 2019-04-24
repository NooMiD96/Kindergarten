import { IChildren } from "@components/Children/State";
// -----------------
//#region ACTIONS TYPE
export const SEARCH_CHILDREN_LIST_REQUEST = "SEARCH_CHILDREN_LIST_REQUEST";
export const SEARCH_CHILDREN_LIST_REQUEST_SUCCESS = "SEARCH_CHILDREN_LIST_REQUEST_SUCCESS";
export const SEARCH_CHILDREN_LIST_REQUEST_ERROR = "SEARCH_CHILDREN_LIST_REQUEST_ERROR";

export const GET_CHILDREN_WITHOUT_VACCINATION_REQUEST = "GET_CHILDREN_WITHOUT_VACCINATION_REQUEST";
export const GET_CHILDREN_WITHOUT_VACCINATION_REQUEST_SUCCESS = "GET_CHILDREN_WITHOUT_VACCINATION_REQUEST_SUCCESS";
export const GET_CHILDREN_WITHOUT_VACCINATION_REQUEST_ERROR = "GET_CHILDREN_WITHOUT_VACCINATION_REQUEST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface ISearchChildrenListRequestAction { type: typeof SEARCH_CHILDREN_LIST_REQUEST; }
export interface ISearchChildrenListRequestSuccessAction { type: typeof SEARCH_CHILDREN_LIST_REQUEST_SUCCESS; childrenList: IChildren[]; }
export interface ISearchChildrenListRequestErrorAction { type: typeof SEARCH_CHILDREN_LIST_REQUEST_ERROR; errorMessage: string; }
export type TSearchChildrenList = ISearchChildrenListRequestAction | ISearchChildrenListRequestSuccessAction | ISearchChildrenListRequestErrorAction;

export interface IGetChildrenWithoutVaccinationRequestAction { type: typeof GET_CHILDREN_WITHOUT_VACCINATION_REQUEST; }
export interface IGetChildrenWithoutVaccinationRequestSuccessAction { type: typeof GET_CHILDREN_WITHOUT_VACCINATION_REQUEST_SUCCESS; childrenList: IChildren[]; }
export interface IGetChildrenWithoutVaccinationRequestErrorAction { type: typeof GET_CHILDREN_WITHOUT_VACCINATION_REQUEST_ERROR; errorMessage: string; }
export type TGetChildrenWithoutVaccination = IGetChildrenWithoutVaccinationRequestAction | IGetChildrenWithoutVaccinationRequestSuccessAction | IGetChildrenWithoutVaccinationRequestErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TSearchChildrenList | TGetChildrenWithoutVaccination | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
