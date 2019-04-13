import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { IChildren } from "./State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher, uncatchError } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  getChildrenListRequest: (): t.IGetChildrenListRequestAction => ({
    type: t.GET_CHILDREN_LIST_REQUEST,
  }),
  getChildrenListRequestSuccess: (childrenList: IChildren[]): t.IGetChildrenListRequestSuccessAction => ({
    type: t.GET_CHILDREN_LIST_REQUEST_SUCCESS,
    childrenList,
  }),
  getChildrenListRequestError: (errorMessage: string): t.IGetChildrenListRequestErrorAction => ({
    type: t.GET_CHILDREN_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  changeChildrenListRequest: (): t.IChangeChildrenListRequestAction => ({
    type: t.CHANGE_CHILDREN_LIST_REQUEST,
  }),
  changeChildrenListRequestSuccess: (): t.IChangeChildrenListRequestSuccessAction => ({
    type: t.CHANGE_CHILDREN_LIST_REQUEST_SUCCESS,
  }),
  changeChildrenListRequestError: (errorMessage: string): t.IChangeChildrenListRequestErrorAction => ({
    type: t.CHANGE_CHILDREN_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  deleteChildrenListRequest: (): t.IDeleteChildrenListRequestAction => ({
    type: t.DELETE_CHILDREN_LIST_REQUEST,
  }),
  deleteChildrenListRequestSuccess: (): t.IDeleteChildrenListRequestSuccessAction => ({
    type: t.DELETE_CHILDREN_LIST_REQUEST_SUCCESS,
  }),
  deleteChildrenListRequestError: (errorMessage: string): t.IDeleteChildrenListRequestErrorAction => ({
    type: t.DELETE_CHILDREN_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "ChildrenGroups";
export const actionCreators = {
  getChildrenList: (): AppThunkAction<t.TGetChildrenList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetChildrenList";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
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

        dispatch(actionsList.getChildrenListRequestSuccess(value.data));
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getChildrenListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getChildrenListRequest());
  },
  changeChildren: (childrenList: IChildren[]): AppThunkAction<t.TChangeChildrenList | t.TGetChildrenList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "ChangeChildrenList";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(childrenList),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.changeChildrenListRequestSuccess());
        actionCreators.getChildrenList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.changeChildrenListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.changeChildrenListRequest());
  },
  deleteChildren: (childrenId: string): AppThunkAction<t.TDeleteChildrenList | t.TGetChildrenList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "DeleteChildrenList";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?childrenId=${childrenId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteChildrenListRequestSuccess());
        actionCreators.getChildrenList()(dispatch, getState);
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.deleteChildrenListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.deleteChildrenListRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
