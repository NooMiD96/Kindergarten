import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";

import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
import { Post, Comment } from "@components/Home/State";

// ----------------
//#region ACTIONS
export const ActionsList = {
  GetPostRequest: (postId: number): t.IGetPostRequestAction => ({
    type: t.GET_POST_REQUEST,
    postId,
  }),
  GetPostRequestSuccess: (data: Post): t.IGetPostRequestSuccessAction => ({
    type: t.GET_POST_REQUEST_SUCCESS,
    data,
  }),
  GetPostRequestError: (errorMessage: string): t.IGetPostRequestErrorAction => ({
    type: t.GET_POST_REQUEST_ERROR,
    errorMessage,
  }),
  SendCommentRequest: (): t.ISendCommentRequestAction => ({
    type: t.SEND_COMMENT_REQUEST,
  }),
  SendCommentRequestSuccess: (comment: Comment): t.ISendCommentRequestSuccessAction => ({
    type: t.SEND_COMMENT_REQUEST_SUCCESS,
    comment,
  }),
  SendCommentRequestError: (errorMessage: string): t.ISendCommentRequestErrorAction => ({
    type: t.SEND_COMMENT_REQUEST_ERROR,
    errorMessage,
  }),
  GetCommentsRequest: (): t.IGetCommentsRequestAction => ({
    type: t.GET_COMMENTS_REQUEST,
  }),
  GetCommentsRequestSuccess: (commentsList: Comment[]): t.IGetCommentsRequestSuccessAction => ({
    type: t.GET_COMMENTS_REQUEST_SUCCESS,
    commentsList,
  }),
  GetCommentsRequestError: (errorMessage: string): t.IGetCommentsRequestErrorAction => ({
    type: t.GET_COMMENTS_REQUEST_ERROR,
    errorMessage,
  }),
  DeletePostRequest: (): t.IDeletePostRequestAction => ({
    type: t.DELETE_POST_REQUEST,
  }),
  DeletePostRequestSuccess: (): t.IDeletePostRequestSuccessAction => ({
    type: t.DELETE_POST_REQUEST_SUCCESS,
  }),
  DeletePostRequestError: (errorMessage: string): t.IDeletePostRequestErrorAction => ({
    type: t.DELETE_POST_REQUEST_ERROR,
    errorMessage,
  }),
  DeleteCommentListRequest: (): t.IDeleteCommentListRequestAction => ({
    type: t.DELETE_COMMENT_LIST_REQUEST,
  }),
  DeleteCommentListRequestSuccess: (): t.IDeleteCommentListRequestSuccessAction => ({
    type: t.DELETE_COMMENT_LIST_REQUEST_SUCCESS,
  }),
  DeleteCommentListRequestError: (errorMessage: string): t.IDeleteCommentListRequestErrorAction => ({
    type: t.DELETE_COMMENT_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  CleanePostData: (): t.ICleanePostDataAction => ({
    type: t.CLEANE_POST_DATA,
  }),
  CleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
export const ActionCreators = {
  GetPost: (postId: number): AppThunkAction<t.TGetPostRequest> => (dispatch, _getState) => {
    const fetchTask = fetch(`/api/post/getpost?postid=${postId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      credentials: "same-origin",
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<Post>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }

      value.data.commentsList.forEach((comment: Comment) => comment.date = new Date(comment.date));

      dispatch(ActionsList.GetPostRequestSuccess(value.data));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      err,
      ActionsList.GetPostRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetPostRequest(postId));
  },
  DeletePost: (PostId: number): AppThunkAction<t.TDeletePostRequest> => (dispatch, _getState) => {
    const fetchTask = fetch(`/api/post/deletepost?postid=${PostId}`, {
      method: "DELETE",
      credentials: "same-origin",
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<void>) => {
      if (value && value.error) {
        if (value.error === "auth") {
          // TODO:
          // AuthActions.LogOut()(dispatch as any, _getState);
          // message.error('Need auth again');
          return;
        }
        return errorCreater("Some trouble when post comment.\n" + value.error);
      }
      dispatch(ActionsList.DeletePostRequestSuccess());
      // TODO:
      // PostsActions.GetPosts(1, 5)(dispatch as any, _getState);
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      err,
      ActionsList.DeletePostRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.DeletePostRequest());
  },

  GetComments: (): AppThunkAction<t.TGetCommentsRequest> => (dispatch, getState) => {
    // TODO:
    const { postId } = (getState() as any).post;
    const fetchTask = fetch(`/api/post/getcomments?postid=${postId}`, {
      method: "GET",
      credentials: "same-origin",
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<Comment[]>) => {
      if (value.error) {
        return errorCreater("Some trouble when post comment.\n" + value.error);
      }

      value.data.forEach((comment: Comment) => comment.date = new Date(comment.date));

      dispatch(ActionsList.GetCommentsRequestSuccess(value.data));
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      err,
      ActionsList.GetCommentsRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetCommentsRequest());
  },
  SendComment: (comment: string, PostId: number): AppThunkAction<t.TSendCommentRequest> => (dispatch, _getState) => {
    const fetchTask = fetch(`/api/post/addcomment?postid=${PostId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      credentials: "same-origin",
      body: comment,
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<Comment>) => {
      if (value && value.error) {
        if (value.error === "auth") {
          // TODO:
          // AuthActions.LogOut()(dispatch as any, _getState);
          // message.error("Need auth again");
          return;
        }
        return errorCreater("Some trouble when post comment.\n" + value.error);
      }

      value.data.date = new Date();
      dispatch(ActionsList.SendCommentRequestSuccess(value.data));

      ActionCreators.GetComments()(dispatch as any, _getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      err,
      ActionsList.SendCommentRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.SendCommentRequest());
  },
  DeleteCommentsList: (postId: number, commentList: [any]): AppThunkAction<t.TDeleteCommentListRequest> => (dispatch, _getState) => {
    const fetchTask = fetch(`/api/post/deletecommentslist?postid=${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      credentials: "same-origin",
      body: JSON.stringify(commentList),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<void>) => {
      if (value && value.error) {
        if (value.error === "auth") {
          // TODO:
          // AuthActions.LogOut()(dispatch as any, _getState);
          // message.error('Need auth again');
          return;
        }
        return errorCreater("Some trouble when delete comments.\n" + value.error);
      }

      dispatch(ActionsList.DeleteCommentListRequestSuccess());
      ActionCreators.GetComments()(dispatch as any, _getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      err,
      ActionsList.DeleteCommentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.DeleteCommentListRequest());
  },

  CleanePostData: ActionsList.CleanePostData,
  CleanErrorInner: ActionsList.CleanErrorInner,
};
//#endregion
