import { IGroupState } from "@components/Group/State";
// -----------------
//#region ACTIONS TYPE
export const GET_CHILDREN_GROUPS_REQUEST = "GET_CHILDREN_GROUPS_REQUEST";
export const GET_CHILDREN_GROUPS_REQUEST_SUCCESS = "GET_CHILDREN_GROUPS_REQUEST_SUCCESS";
export const GET_CHILDREN_GROUPS_REQUEST_ERROR = "GET_CHILDREN_GROUPS_REQUEST_ERROR";

export const CHANGE_CHILDREN_GROUPS_REQUEST = "CHANGE_CHILDREN_GROUPS_REQUEST";
export const CHANGE_CHILDREN_GROUPS_REQUEST_SUCCESS = "CHANGE_CHILDREN_GROUPS_REQUEST_SUCCESS";
export const CHANGE_CHILDREN_GROUPS_REQUEST_ERROR = "CHANGE_CHILDREN_GROUPS_REQUEST_ERROR";

export const DELETE_CHILDREN_GROUPS_REQUEST = "DELETE_CHILDREN_GROUPS_REQUEST";
export const DELETE_CHILDREN_GROUPS_REQUEST_SUCCESS = "DELETE_CHILDREN_GROUPS_REQUEST_SUCCESS";
export const DELETE_CHILDREN_GROUPS_REQUEST_ERROR = "DELETE_CHILDREN_GROUPS_REQUEST_ERROR";

export const ADD_NEW_CHILDREN_GROUP = "ADD_NEW_CHILDREN_GROUP";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE

export interface IGetChildrenGroupsRequestAction { type: typeof GET_CHILDREN_GROUPS_REQUEST; }
export interface IGetChildrenGroupsRequestSuccessAction { type: typeof GET_CHILDREN_GROUPS_REQUEST_SUCCESS; childrenGroups: IGroupState[]; }
export interface IGetChildrenGroupsRequestErrorAction { type: typeof GET_CHILDREN_GROUPS_REQUEST_ERROR; errorMessage: string; }
export type TGetChildrenGroups = IGetChildrenGroupsRequestAction | IGetChildrenGroupsRequestSuccessAction | IGetChildrenGroupsRequestErrorAction;

export interface IChangeChildrenGroupsRequestAction { type: typeof CHANGE_CHILDREN_GROUPS_REQUEST; }
export interface IChangeChildrenGroupsRequestSuccessAction { type: typeof CHANGE_CHILDREN_GROUPS_REQUEST_SUCCESS; }
export interface IChangeChildrenGroupsRequestErrorAction { type: typeof CHANGE_CHILDREN_GROUPS_REQUEST_ERROR; errorMessage: string; }
export type TChangeChildrenGroups = IChangeChildrenGroupsRequestAction | IChangeChildrenGroupsRequestSuccessAction | IChangeChildrenGroupsRequestErrorAction;

export interface IDeleteChildrenGroupsRequestAction { type: typeof DELETE_CHILDREN_GROUPS_REQUEST; }
export interface IDeleteChildrenGroupsRequestSuccessAction { type: typeof DELETE_CHILDREN_GROUPS_REQUEST_SUCCESS; }
export interface IDeleteChildrenGroupsRequestErrorAction { type: typeof DELETE_CHILDREN_GROUPS_REQUEST_ERROR; errorMessage: string; }
export type TDeleteChildrenGroups = IDeleteChildrenGroupsRequestAction | IDeleteChildrenGroupsRequestSuccessAction | IDeleteChildrenGroupsRequestErrorAction;

export interface IAddNewChildrenGroupAction { type: typeof ADD_NEW_CHILDREN_GROUP; childrenGroup: IGroupState; }
export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetChildrenGroups | TChangeChildrenGroups | TDeleteChildrenGroups | IAddNewChildrenGroupAction | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
