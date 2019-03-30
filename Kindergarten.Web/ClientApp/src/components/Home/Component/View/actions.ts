import { fetch, addTask } from "domain-task";

import { message } from "antd";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
import { IPost, IComment } from "@components/Home/State";

import { ActionCreators as AuthActions } from "@components/Account/actions";
import { TLogout } from "@components/Account/actionsType";
import { ActionCreators as PostActions } from "@components/Home/actions";
import { TGetPostList } from "@components/Home/actionsType";

// ----------------
//#region ACTIONS
export const ActionsList = {
  getPostRequest: (postId: number): t.IGetPostRequestAction => ({
    type: t.GET_POST_REQUEST,
    postId,
  }),
  getPostRequestSuccess: (data: IPost): t.IGetPostRequestSuccessAction => ({
    type: t.GET_POST_REQUEST_SUCCESS,
    data,
  }),
  getPostRequestError: (errorMessage: string): t.IGetPostRequestErrorAction => ({
    type: t.GET_POST_REQUEST_ERROR,
    errorMessage,
  }),
  sendCommentRequest: (): t.ISendCommentRequestAction => ({
    type: t.SEND_COMMENT_REQUEST,
  }),
  sendCommentRequestSuccess: (comment: IComment): t.ISendCommentRequestSuccessAction => ({
    type: t.SEND_COMMENT_REQUEST_SUCCESS,
    comment,
  }),
  sendCommentRequestError: (errorMessage: string): t.ISendCommentRequestErrorAction => ({
    type: t.SEND_COMMENT_REQUEST_ERROR,
    errorMessage,
  }),
  getCommentListRequest: (): t.IGetCommentListRequestAction => ({
    type: t.GET_COMMENTS_REQUEST,
  }),
  getCommentListRequestSuccess: (commentsList: IComment[]): t.IGetCommentListRequestSuccessAction => ({
    type: t.GET_COMMENTS_REQUEST_SUCCESS,
    commentsList,
  }),
  getCommentListRequestError: (errorMessage: string): t.IGetCommentListRequestErrorAction => ({
    type: t.GET_COMMENTS_REQUEST_ERROR,
    errorMessage,
  }),
  deletePostRequest: (): t.IDeletePostRequestAction => ({
    type: t.DELETE_POST_REQUEST,
  }),
  deletePostRequestSuccess: (): t.IDeletePostRequestSuccessAction => ({
    type: t.DELETE_POST_REQUEST_SUCCESS,
  }),
  deletePostRequestError: (errorMessage: string): t.IDeletePostRequestErrorAction => ({
    type: t.DELETE_POST_REQUEST_ERROR,
    errorMessage,
  }),
  deleteCommentListRequest: (): t.IDeleteCommentListRequestAction => ({
    type: t.DELETE_COMMENT_LIST_REQUEST,
  }),
  deleteCommentListRequestSuccess: (): t.IDeleteCommentListRequestSuccessAction => ({
    type: t.DELETE_COMMENT_LIST_REQUEST_SUCCESS,
  }),
  deleteCommentListRequestError: (errorMessage: string): t.IDeleteCommentListRequestErrorAction => ({
    type: t.DELETE_COMMENT_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  cleanePostData: (): t.ICleanePostDataAction => ({
    type: t.CLEANE_POST_DATA,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const uncatchError = "Упс... Что-то пошло не так... Пожалуйста, повторите попытку";
export const ActionCreators = {
  getPost: (postId: number): AppThunkAction<t.TGetPostRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/post/GetPost?postId=${postId}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        ...xptToHeader,
      },
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
      }
    }).then((res: IResponse<IPost>) => {
      if (res && res.error) {
        return errorCreater(res.error);
      }

      res.data.commentList.forEach((comment: IComment) => comment.date = new Date(comment.date));

      dispatch(ActionsList.getPostRequestSuccess(res.data));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetPost",
      err,
      ActionsList.getPostRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.getPostRequest(postId));
  },
  deletePost: (postId: number): AppThunkAction<t.TDeletePostRequest | TLogout | TGetPostList> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/post/DeletePost?postId=${postId}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        ...xptToHeader,
      },
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
      }
    }).then((value: IResponse<boolean>) => {
      if (value && value.error) {
        if (value.error === "auth") {
          AuthActions.logout()(dispatch, getState);
          message.error("Need auth again");
          return;
        }
        return errorCreater("Произошла ошибка при удалении публикации.\n" + value.error);
      }
      dispatch(ActionsList.deletePostRequestSuccess());
      PostActions.getPosts(1, 5)(dispatch, getState);
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "DeletePost",
      err,
      ActionsList.deletePostRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.deletePostRequest());
  },

  getCommentList: (): AppThunkAction<t.TGetCommentListRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const { postId } = (getState() as any).post;
    const fetchTask = fetch(`/api/post/GetCommentList?postId=${postId}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        ...xptToHeader,
      },
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
      }
    }).then((value: IResponse<{ CommentList: IComment[] }>) => {
      if (value.error) {
        return errorCreater("Произошла ошибка при получении комментариев.\n" + value.error);
      }

      value.data.CommentList.forEach((comment: IComment) => comment.date = new Date(comment.date));

      dispatch(ActionsList.getCommentListRequestSuccess(value.data.CommentList));
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetComments",
      err,
      ActionsList.getCommentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.getCommentListRequest());
  },
  sendComment: (comment: string, postId: number): AppThunkAction<t.TSendCommentRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/post/AddComment?postid=${postId}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: comment,
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
      }
    }).then((value: IResponse<IComment>) => {
      if (value && value.error) {
        if (value.error === "auth") {
          // TODO:
          // AuthActions.LogOut()(dispatch as any, _getState);
          // message.error("Need auth again");
          return;
        }
        return errorCreater("Произошла ошибка при добавлении комментария.\n" + value.error);
      }

      value.data.date = new Date();
      dispatch(ActionsList.sendCommentRequestSuccess(value.data));

      ActionCreators.getCommentList()(dispatch as any, getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "SendComment",
      err,
      ActionsList.sendCommentRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.sendCommentRequest());
  },
  deleteCommentList: (postId: number, commentList: [any]): AppThunkAction<t.TDeleteCommentListRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/post/DeleteCommentList?postId=${postId}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(commentList),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
      }
    }).then((value: IResponse<void>) => {
      if (value && value.error) {
        if (value.error === "auth") {
          // TODO:
          // AuthActions.LogOut()(dispatch as any, _getState);
          // message.error('Need auth again');
          return;
        }
        return errorCreater("Произошла ошибка при удалении комментариев.\n" + value.error);
      }

      dispatch(ActionsList.deleteCommentListRequestSuccess());
      ActionCreators.getCommentList()(dispatch as any, getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "DeleteCommentsList",
      err,
      ActionsList.deleteCommentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.deleteCommentListRequest());
  },

  cleanePostData: ActionsList.cleanePostData,
  cleanErrorInner: ActionsList.cleanErrorInner,
};
//#endregion
