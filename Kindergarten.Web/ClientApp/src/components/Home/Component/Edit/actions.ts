import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";

import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";

// ----------------
//#region ACTIONS
export const ActionsList = {
  CreateEditPostRequest: (): t.ICreateEditPostRequestAction => ({
    type: t.CREATE_EDIT_POST_REQUEST,
  }),
  CreateEditPostSuccess: (): t.ICreateEditPostSuccessAction => ({
    type: t.CREATE_EDIT_POST_SUCCESS,
  }),
  CreateEditPostError: (errorMessage: string): t.ICreateEditPostErrorAction => ({
    type: t.CREATE_EDIT_POST_ERROR,
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
  CreateEditPost: (postId: number, header: string, context: string, imgUrl?: string): AppThunkAction<t.TCreateEditPostRequest> => (dispatch, _getState) => {
    const fetchTask = fetch(`/api/post/createoredit?postid=${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      credentials: "same-origin",
      body: JSON.stringify({ header, context, imgUrl }),
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
        return errorCreater("Some trouble when getting post.\n" + value.error);
      }

      dispatch(ActionsList.CreateEditPostSuccess());
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "CreateEditPost",
      err,
      ActionsList.CreateEditPostError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.CreateEditPostRequest());
  },
  CleanErrorInner: ActionsList.CleanErrorInner,
};
//#endregion
