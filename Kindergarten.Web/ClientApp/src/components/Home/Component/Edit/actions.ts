import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";

// ----------------
//#region ACTIONS
export const ActionsList = {
  createEditPostRequest: (): t.ICreateEditPostRequestAction => ({
    type: t.CREATE_EDIT_POST_REQUEST,
  }),
  createEditPostSuccess: (): t.ICreateEditPostSuccessAction => ({
    type: t.CREATE_EDIT_POST_SUCCESS,
  }),
  createEditPostError: (errorMessage: string): t.ICreateEditPostErrorAction => ({
    type: t.CREATE_EDIT_POST_ERROR,
    errorMessage,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const uncatchError = "Упс... Что-то пошло не так... Пожалуйста, повторите попытку.";
export const ActionCreators = {
  createEditPost: (postId: number, header: string, content: string, imgUrl?: string): AppThunkAction<t.TCreateEditPostRequest> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/Post/CreateOrEdit?postid=${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      credentials: "same-origin",
      body: JSON.stringify({ header, content, imgUrl }),
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
        return errorCreater("Произошла ошибка при получении новых публикаций.\n" + value.error);
      }

      dispatch(ActionsList.createEditPostSuccess());
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "CreateEditPost",
      err,
      ActionsList.createEditPostError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.createEditPostRequest());
  },
  cleanErrorInner: ActionsList.cleanErrorInner,
};
//#endregion
