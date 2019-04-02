import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { IPost } from "./State";
import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";

// ----------------
//#region ACTIONS
export const ActionsList = {
  getPostListRequest: (): t.IGetPostListRequestAction => ({
    type: t.GET_POST_LIST_REQUEST,
  }),
  getPostListRequestSuccess: (postList: IPost[], totalCount: number): t.IGetPostListRequestSuccessAction => ({
    type: t.GET_POST_LIST_REQUEST_SUCCESS,
    postList: postList,
    totalCount,
  }),
  getPostListRequestError: (errorMessage: string): t.IGetPostListRequestErrorAction => ({
    type: t.GET_POST_LIST_REQUEST_ERROR,
    errorMessage,
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
  getPosts: (page: number, pageSize: number): AppThunkAction<t.TGetPostList> => (dispatch, getState) => {
    type ResponseDataType = { postList: IPost[]; totalCount: number; };

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
        return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
      }
    }).then((value: IResponse<ResponseDataType>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }

      value.data.postList.forEach((item: IPost) => item.date = new Date(item.date));
      dispatch(ActionsList.getPostListRequestSuccess(value.data.postList, value.data.totalCount));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetPosts",
      err,
      ActionsList.getPostListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.getPostListRequest());
  },
  cleanErrorInner: ActionsList.cleanErrorInner,
};
//#endregion
