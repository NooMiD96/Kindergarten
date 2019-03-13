import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";
import { parseData } from "@core/fetchHelper";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { Post } from "./State";
import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";

// ----------------
//#region ACTIONS
export const ActionsList = {
  GetPostListRequest: (): t.IGetPostListRequestAction => ({
    type: t.GET_POST_LIST_REQUEST,
  }),
  GetPostListRequestSuccess: (postList: Post[], totalCount: number): t.IGetPostListRequestSuccessAction => ({
    type: t.GET_POST_LIST_REQUEST_SUCCESS,
    postList: postList,
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
  GetPosts: (page: number, pageSize: number): AppThunkAction<t.TGetPostList> => (dispatch, getState) => {
    type ResponseDataType = { PostList: Post[]; TotalCount: number; };

    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/Post/GetPreviewPostList?page=${page}&pageSize=${pageSize}`, {
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
    }).then((value: IResponse<ResponseDataType>) => {
      if (value && value.error) {
        return errorCreater("Some trouble when getting posts.\n" + value.error);
      }

      const data = parseData(value.data);

      data.PostList.forEach((item: Post) => item.date = new Date(item.date));
      dispatch(ActionsList.GetPostListRequestSuccess(value.data.PostList, value.data.TotalCount));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetPosts",
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
