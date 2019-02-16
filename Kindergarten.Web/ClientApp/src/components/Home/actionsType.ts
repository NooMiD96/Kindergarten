import { Post } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_POST_LIST_REQUEST = "GET_POST_LIST_REQUEST";
export const GET_POST_LIST_REQUEST_SUCCESS = "GET_POST_LIST_REQUEST_SUCCESS";
export const GET_POST_LIST_REQUEST_ERROR = "GET_POST_LIST_REQUEST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetPostListRequestAction { type: typeof GET_POST_LIST_REQUEST; }
export interface IGetPostListRequestSuccessAction { type: typeof GET_POST_LIST_REQUEST_SUCCESS; posts: Post[]; totalCount: number; }
export interface IGetPostListRequestErrorAction { type: typeof GET_POST_LIST_REQUEST_ERROR; errorMessage: string; }
export type TGetPostList = IGetPostListRequestAction | IGetPostListRequestSuccessAction | IGetPostListRequestErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetPostList | ICleanErrorInnerAction;
export default KnownAction;
//#endregion
