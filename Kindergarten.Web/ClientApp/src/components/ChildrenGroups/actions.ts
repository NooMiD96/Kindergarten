import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { IGroupState } from "@components/Group/State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  getChildrenGroupsRequest: (): t.IGetChildrenGroupsRequestAction => ({
    type: t.GET_CHILDREN_GROUPS_REQUEST,
  }),
  getChildrenGroupsRequestSuccess: (childrenGroups: IGroupState[]): t.IGetChildrenGroupsRequestSuccessAction => ({
    type: t.GET_CHILDREN_GROUPS_REQUEST_SUCCESS,
    childrenGroups,
  }),
  getChildrenGroupsRequestError: (errorMessage: string): t.IGetChildrenGroupsRequestErrorAction => ({
    type: t.GET_CHILDREN_GROUPS_REQUEST_ERROR,
    errorMessage,
  }),
  changeChildrenGroupsRequest: (): t.IChangeChildrenGroupsRequestAction => ({
    type: t.CHANGE_CHILDREN_GROUPS_REQUEST,
  }),
  changeChildrenGroupsRequestSuccess: (): t.IChangeChildrenGroupsRequestSuccessAction => ({
    type: t.CHANGE_CHILDREN_GROUPS_REQUEST_SUCCESS,
  }),
  changeChildrenGroupsRequestError: (errorMessage: string): t.IChangeChildrenGroupsRequestErrorAction => ({
    type: t.CHANGE_CHILDREN_GROUPS_REQUEST_ERROR,
    errorMessage,
  }),
  deleteChildrenGroupsRequest: (): t.IDeleteChildrenGroupsRequestAction => ({
    type: t.DELETE_CHILDREN_GROUPS_REQUEST,
  }),
  deleteChildrenGroupsRequestSuccess: (): t.IDeleteChildrenGroupsRequestSuccessAction => ({
    type: t.DELETE_CHILDREN_GROUPS_REQUEST_SUCCESS,
  }),
  deleteChildrenGroupsRequestError: (errorMessage: string): t.IDeleteChildrenGroupsRequestErrorAction => ({
    type: t.DELETE_CHILDREN_GROUPS_REQUEST_ERROR,
    errorMessage,
  }),
  addNewChildrenGroup: (childrenGroup: IGroupState): t.IAddNewChildrenGroupAction => ({
    type: t.ADD_NEW_CHILDREN_GROUP,
    childrenGroup,
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
  getChildrenGroups: (): AppThunkAction<t.TGetChildrenGroups | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetChildrenGroups";
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
      .then((value: IResponse<IGroupState[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getChildrenGroupsRequestSuccess(value.data));
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getChildrenGroupsRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getChildrenGroupsRequest());
  },
  saveChildrenGroups: (childrenGroups: IGroupState[]): AppThunkAction<t.TChangeChildrenGroups | t.TGetChildrenGroups | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "ChangeChildrenGroups";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(childrenGroups),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.changeChildrenGroupsRequestSuccess());
        actionCreators.getChildrenGroups()(dispatch, getState);
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.changeChildrenGroupsRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.changeChildrenGroupsRequest());
  },
  deleteChildrenGroups: (childrenGroupIdList: string[]): AppThunkAction<t.TDeleteChildrenGroups | t.TGetChildrenGroups | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "DeleteChildrenGroups";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(childrenGroupIdList.map(x => Number.parseInt(x, 10))),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteChildrenGroupsRequestSuccess());
        actionCreators.getChildrenGroups()(dispatch, getState);
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.deleteChildrenGroupsRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.deleteChildrenGroupsRequest());
  },
  addNewChildrenGroup: actionsList.addNewChildrenGroup,
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
