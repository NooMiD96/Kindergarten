import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";
import { ActionCreators as AccountActions } from "@components/Account/actions";

import { IChildren } from "./State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  getChildrenRequest: (): t.IGetChildrenRequestAction => ({
    type: t.GET_CHILDREN_REQUEST,
  }),
  getChildrenRequestSuccess: (children: IChildren): t.IGetChildrenRequestSuccessAction => ({
    type: t.GET_CHILDREN_REQUEST_SUCCESS,
    children,
  }),
  getChildrenRequestError: (errorMessage: string): t.IGetChildrenRequestErrorAction => ({
    type: t.GET_CHILDREN_REQUEST_ERROR,
    errorMessage,
  }),
  changeChildrenRequest: (): t.IChangeChildrenRequestAction => ({
    type: t.CHANGE_CHILDREN_REQUEST,
  }),
  changeChildrenRequestSuccess: (): t.IChangeChildrenRequestSuccessAction => ({
    type: t.CHANGE_CHILDREN_REQUEST_SUCCESS,
  }),
  changeChildrenRequestError: (errorMessage: string): t.IChangeChildrenRequestErrorAction => ({
    type: t.CHANGE_CHILDREN_REQUEST_ERROR,
    errorMessage,
  }),
  deleteChildrenRequest: (): t.IDeleteChildrenRequestAction => ({
    type: t.DELETE_CHILDREN_REQUEST,
  }),
  deleteChildrenRequestSuccess: (): t.IDeleteChildrenRequestSuccessAction => ({
    type: t.DELETE_CHILDREN_REQUEST_SUCCESS,
  }),
  deleteChildrenRequestError: (errorMessage: string): t.IDeleteChildrenRequestErrorAction => ({
    type: t.DELETE_CHILDREN_REQUEST_ERROR,
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
  getChildren: (childrenId: string): AppThunkAction<t.TGetChildren | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetChildren";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?childrenId=${childrenId}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IChildren>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getChildrenRequestSuccess(value.data));
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getChildrenRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getChildrenRequest());
  },
  changeChildren: (children: IChildren): AppThunkAction<t.TChangeChildren | t.TGetChildren | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "ChangeChildren";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?childrenId=${children.childrenId}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(children),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.changeChildrenRequestSuccess());
        actionCreators.getChildren(children.childrenId.toString())(dispatch, getState);
        AccountActions.getNotify()(dispatch as any, getState);

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.changeChildrenRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.changeChildrenRequest());
  },
  deleteChildren: (childrenId: string): AppThunkAction<t.TDeleteChildren | t.TGetChildren | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "DeleteChildren";
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

        dispatch(actionsList.deleteChildrenRequestSuccess());
        actionCreators.getChildren(childrenId)(dispatch, getState);
        AccountActions.getNotify()(dispatch as any, getState);

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.deleteChildrenRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.deleteChildrenRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
