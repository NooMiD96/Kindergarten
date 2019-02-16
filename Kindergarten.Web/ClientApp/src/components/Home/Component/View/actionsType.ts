import { Post, Comment } from "@components/Home/State";
// -----------------
//#region ACTIONS TYPE
export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_REQUEST_SUCCESS = "GET_POST_REQUEST_SUCCESS";
export const GET_POST_REQUEST_ERROR = "GET_POST_REQUEST_ERROR";

export const SEND_COMMENT_REQUEST = "SEND_COMMENT_REQUEST";
export const SEND_COMMENT_REQUEST_SUCCESS = "SEND_COMMENT_REQUEST_SUCCESS";
export const SEND_COMMENT_REQUEST_ERROR = "SEND_COMMENT_REQUEST_ERROR";

export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_REQUEST_SUCCESS = "GET_COMMENTS_REQUEST_SUCCESS";
export const GET_COMMENTS_REQUEST_ERROR = "GET_COMMENTS_REQUEST_ERROR";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_REQUEST_SUCCESS = "DELETE_POST_REQUEST_SUCCESS";
export const DELETE_POST_REQUEST_ERROR = "DELETE_POST_REQUEST_ERROR";

export const DELETE_COMMENT_LIST_REQUEST = "DELETE_COMMENT_LIST_REQUEST";
export const DELETE_COMMENT_LIST_REQUEST_SUCCESS = "DELETE_COMMENT_LIST_REQUEST_SUCCESS";
export const DELETE_COMMENT_LIST_REQUEST_ERROR = "DELETE_COMMENT_LIST_REQUEST_ERROR";

export const CLEANE_POST_DATA = "CLEANE_POST_DATA";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetPostRequestAction { type: typeof GET_POST_REQUEST; postId: number; }
export interface IGetPostRequestSuccessAction { type: typeof GET_POST_REQUEST_SUCCESS; data: Post; }
export interface IGetPostRequestErrorAction { type: typeof GET_POST_REQUEST_ERROR; errorMessage: string; }
export type TGetPostRequest = IGetPostRequestAction | IGetPostRequestSuccessAction | IGetPostRequestErrorAction;

export interface ISendCommentRequestAction { type: typeof SEND_COMMENT_REQUEST; }
export interface ISendCommentRequestSuccessAction { type: typeof SEND_COMMENT_REQUEST_SUCCESS; comment: Comment; }
export interface ISendCommentRequestErrorAction { type: typeof SEND_COMMENT_REQUEST_ERROR; errorMessage: string; }
export type TSendCommentRequest = ISendCommentRequestAction | ISendCommentRequestSuccessAction | ISendCommentRequestErrorAction;

export interface IGetCommentsRequestAction { type: typeof GET_COMMENTS_REQUEST; }
export interface IGetCommentsRequestSuccessAction { type: typeof GET_COMMENTS_REQUEST_SUCCESS; commentsList: Comment[]; }
export interface IGetCommentsRequestErrorAction { type: typeof GET_COMMENTS_REQUEST_ERROR; errorMessage: string; }
export type TGetCommentsRequest = IGetCommentsRequestAction | IGetCommentsRequestSuccessAction | IGetCommentsRequestErrorAction;

export interface IDeletePostRequestAction { type: typeof DELETE_POST_REQUEST; }
export interface IDeletePostRequestSuccessAction { type: typeof DELETE_POST_REQUEST_SUCCESS; }
export interface IDeletePostRequestErrorAction { type: typeof DELETE_POST_REQUEST_ERROR; errorMessage: string; }
export type TDeletePostRequest = IDeletePostRequestAction | IDeletePostRequestSuccessAction | IDeletePostRequestErrorAction;

export interface IDeleteCommentListRequestAction { type: typeof DELETE_COMMENT_LIST_REQUEST; }
export interface IDeleteCommentListRequestSuccessAction { type: typeof DELETE_COMMENT_LIST_REQUEST_SUCCESS; }
export interface IDeleteCommentListRequestErrorAction { type: typeof DELETE_COMMENT_LIST_REQUEST_ERROR; errorMessage: string; }
export type TDeleteCommentListRequest = IDeleteCommentListRequestAction | IDeleteCommentListRequestSuccessAction | IDeleteCommentListRequestErrorAction;

export interface ICleanePostDataAction { type: typeof CLEANE_POST_DATA; }
export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TGetPostRequest | TSendCommentRequest | TGetCommentsRequest | TDeletePostRequest
    | TDeleteCommentListRequest | ICleanePostDataAction | ICleanErrorInnerAction;
export default KnownAction;
//#endregion
