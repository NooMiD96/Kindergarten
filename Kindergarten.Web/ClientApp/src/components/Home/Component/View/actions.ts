import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";
import { parseData } from "@src/core/fetchHelper";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

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
  GetCommentListRequest: (): t.IGetCommentListRequestAction => ({
    type: t.GET_COMMENTS_REQUEST,
  }),
  GetCommentListRequestSuccess: (commentsList: Comment[]): t.IGetCommentListRequestSuccessAction => ({
    type: t.GET_COMMENTS_REQUEST_SUCCESS,
    commentsList,
  }),
  GetCommentListRequestError: (errorMessage: string): t.IGetCommentListRequestErrorAction => ({
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
  GetPost: (postId: number): AppThunkAction<t.TGetPostRequest> => (dispatch, getState) => {
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
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<Post>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }

      const data = parseData(value.data);

      data.commentList.forEach((comment: Comment) => comment.date = new Date(comment.date));

      dispatch(ActionsList.GetPostRequestSuccess(value.data));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetPost",
      err,
      ActionsList.GetPostRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetPostRequest(postId));
  },
  DeletePost: (PostId: number): AppThunkAction<t.TDeletePostRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/post/DeletePost?postId=${PostId}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        ...xptToHeader,
      },
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
      "DeletePost",
      err,
      ActionsList.DeletePostRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.DeletePostRequest());
  },

  GetCommentList: (): AppThunkAction<t.TGetCommentListRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    // TODO:
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
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<{ CommentList: Comment[] }>) => {
      if (value.error) {
        return errorCreater("Some trouble when post comment.\n" + value.error);
      }

      const data = parseData(value.data);

      data.CommentList.forEach((comment: Comment) => comment.date = new Date(comment.date));

      dispatch(ActionsList.GetCommentListRequestSuccess(data.CommentList));
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetComments",
      err,
      ActionsList.GetCommentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetCommentListRequest());
  },
  SendComment: (comment: string, postId: number): AppThunkAction<t.TSendCommentRequest> => (dispatch, getState) => {
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

      const data = parseData(value.data);

      data.date = new Date();
      dispatch(ActionsList.SendCommentRequestSuccess(data));

      ActionCreators.GetCommentList()(dispatch as any, getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "SendComment",
      err,
      ActionsList.SendCommentRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.SendCommentRequest());
  },
  DeleteCommentList: (postId: number, commentList: [any]): AppThunkAction<t.TDeleteCommentListRequest> => (dispatch, getState) => {
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
      ActionCreators.GetCommentList()(dispatch as any, getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "DeleteCommentsList",
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
