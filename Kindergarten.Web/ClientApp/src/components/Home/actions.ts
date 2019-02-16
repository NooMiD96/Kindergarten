import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";

import { Post } from "./State";
import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";

// ----------------
//#region ACTIONS
export const ActionsList = {
  GetPostListRequest: (): t.IGetPostListRequestAction => ({
    type: t.GET_POST_LIST_REQUEST,
  }),
  GetPostListRequestSuccess: (posts: Post[], totalCount: number): t.IGetPostListRequestSuccessAction => ({
    type: t.GET_POST_LIST_REQUEST_SUCCESS,
    posts,
    totalCount,
  }),
  GetPostListRequestError: (errorMessage: string): t.IGetPostListRequestErrorAction => ({
    type: t.GET_POST_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  CleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
export const ActionCreators = {
  GetPosts: (page: number, pageSize: number): AppThunkAction<t.TGetPostList> => (dispatch) => {
    const fetchTask = fetch(`/api/post/getposts?page=${page}&pageSize=${pageSize}`, {
      credentials: "same-origin",
      method: "GET",
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<{ posts: Post[]; totalCount: number; }>) => {
      if (value && value.error) {
        return errorCreater("Some trouble when getting posts.\n" + value.error);
      }
      value.data.posts.forEach((item: Post) => item.date = new Date(item.date));
      dispatch(ActionsList.GetPostListRequestSuccess(value.data.posts, value.data.totalCount));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      err,
      ActionsList.GetPostListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetPostListRequest());
  },
  CleanErrorInner: ActionsList.CleanErrorInner,
};
//#endregion
