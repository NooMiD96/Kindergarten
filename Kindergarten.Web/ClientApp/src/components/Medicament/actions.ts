import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";
import { ActionCreators as AccountActions } from "@components/Account/actions";

import { IMedicament } from "./State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  getMedicamentListRequest: (): t.IGetMedicamentListRequestAction => ({
    type: t.GET_MEDICAMENT_LIST_REQUEST,
  }),
  getMedicamentListRequestSuccess: (medicamentList: IMedicament[]): t.IGetMedicamentListRequestSuccessAction => ({
    type: t.GET_MEDICAMENT_LIST_REQUEST_SUCCESS,
    medicamentList,
  }),
  getMedicamentListRequestError: (errorMessage: string): t.IGetMedicamentListRequestErrorAction => ({
    type: t.GET_MEDICAMENT_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  changeMedicamentListRequest: (): t.IChangeMedicamentListRequestAction => ({
    type: t.CHANGE_MEDICAMENT_LIST_REQUEST,
  }),
  changeMedicamentListRequestSuccess: (): t.IChangeMedicamentListRequestSuccessAction => ({
    type: t.CHANGE_MEDICAMENT_LIST_REQUEST_SUCCESS,
  }),
  changeMedicamentListRequestError: (errorMessage: string): t.IChangeMedicamentListRequestErrorAction => ({
    type: t.CHANGE_MEDICAMENT_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  deleteMedicamentListRequest: (): t.IDeleteMedicamentListRequestAction => ({
    type: t.DELETE_MEDICAMENT_LIST_REQUEST,
  }),
  deleteMedicamentListRequestSuccess: (): t.IDeleteMedicamentListRequestSuccessAction => ({
    type: t.DELETE_MEDICAMENT_LIST_REQUEST_SUCCESS,
  }),
  deleteMedicamentListRequestError: (errorMessage: string): t.IDeleteMedicamentListRequestErrorAction => ({
    type: t.DELETE_MEDICAMENT_LIST_REQUEST_ERROR,
    errorMessage,
  }),
  addNewMedicament: (medicament: IMedicament): t.IAddNewMedicamentAction => ({
    type: t.ADD_NEW_MEDICAMENT,
    medicament,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Medicament";
export const actionCreators = {
  getMedicamentList: (): AppThunkAction<t.TGetMedicamentList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetMedicamentList";
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
      .then((value: IResponse<IMedicament[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getMedicamentListRequestSuccess(value.data));
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getMedicamentListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getMedicamentListRequest());
  },
  changeMedicamentList: (medicamentList: IMedicament[]): AppThunkAction<t.TChangeMedicamentList | t.TGetMedicamentList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "ChangeMedicamentList";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(medicamentList),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.changeMedicamentListRequestSuccess());
        actionCreators.getMedicamentList()(dispatch, getState);
        AccountActions.getNotify()(dispatch as any, getState);

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.changeMedicamentListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.changeMedicamentListRequest());
  },
  deleteMedicamentList: (medicamentIdList: string[]): AppThunkAction<t.TDeleteMedicamentList | t.TGetMedicamentList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "DeleteMedicamentList";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(medicamentIdList.map(x => Number.parseInt(x, 10))),
    })
      .then(responseCatcher)
      .then((value: IResponse<Boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteMedicamentListRequestSuccess());
        actionCreators.getMedicamentList()(dispatch, getState);
        AccountActions.getNotify()(dispatch as any, getState);

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.deleteMedicamentListRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.deleteMedicamentListRequest());
  },
  addNewMedicament: actionsList.addNewMedicament,
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
