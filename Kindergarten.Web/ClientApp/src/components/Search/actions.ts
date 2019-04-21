import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { IChildren } from "@components/Children/State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  searchChildrenListRequest: (): t.ISearchChildrenListRequestAction => ({
    type: t.SEARCH_CHILDREN_LIST_REQUEST,
  }),
  searchChildrenListRequestSuccess: (childrenList: IChildren[]): t.ISearchChildrenListRequestSuccessAction => ({
    type: t.SEARCH_CHILDREN_LIST_REQUEST_SUCCESS,
    childrenList,
  }),
  searchChildrenListRequestError: (errorMessage: string): t.ISearchChildrenListRequestErrorAction => ({
    type: t.SEARCH_CHILDREN_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Search";
export const actionCreators = {
  searchChildrenList: (searchString: string): AppThunkAction<t.TSearchChildrenList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "SearchChildrenList";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?searchString=${searchString}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IChildren[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.searchChildrenListRequestSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.searchChildrenListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.searchChildrenListRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
