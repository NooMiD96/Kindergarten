import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { IMedicament } from "./State";
import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";

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
  setNewValue: (medicament: IMedicament): t.ISetNewValueAction => ({
    type: t.SET_NEW_VALUE,
    medicament,
  }),
  deleteMedicament: (medicamentId: number): t.IDeleteMedicamentAction => ({
    type: t.DELETE_MEDICAMENT,
    medicamentId,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const uncatchError = "Упс... Что-то пошло не так... Пожалуйста, повторите попытку";
export const actionCreators = {
  getMedicamentList: (): AppThunkAction<t.TGetMedicamentList> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Medicament/GetMedicamentList", {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    }).then(async (res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        switch (res.status) {
          case 400:
            return await errorCreater.createValidationError(res);

          case 401:
            return errorCreater.createAuthError();

          default:
            return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
        }
      }
    }).then((value: IResponse<IMedicament[]>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }

      dispatch(actionsList.getMedicamentListRequestSuccess(value.data));
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Medicament",
      "getMedicamentList",
      err,
      actionsList.getMedicamentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(actionsList.getMedicamentListRequest());
  },
  changeMedicamentList: (medicamentList: IMedicament[]): AppThunkAction<t.TChangeMedicamentList | t.TGetMedicamentList> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Medicament/ChangeMedicamentList", {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify({ medicamentList }),
    }).then(async (res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        switch (res.status) {
          case 400:
            return await errorCreater.createValidationError(res);

          case 401:
            return errorCreater.createAuthError();

          default:
            return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
        }
      }
    }).then((value: IResponse<Boolean>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }

      dispatch(actionsList.changeMedicamentListRequestSuccess());
      actionCreators.getMedicamentList()(dispatch, getState);
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetPosts",
      err,
      actionsList.changeMedicamentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(actionsList.changeMedicamentListRequest());
  },
  deleteMedicamentList: (medicamentList: number[]): AppThunkAction<t.TDeleteMedicamentList | t.TGetMedicamentList> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Medicament/DeleteMedicamentList", {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify({ medicamentList }),
    }).then(async (res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        switch (res.status) {
          case 400:
            return await errorCreater.createValidationError(res);

          case 401:
            return errorCreater.createAuthError();

          default:
            return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
        }
      }
    }).then((value: IResponse<Boolean>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }

      dispatch(actionsList.deleteMedicamentListRequestSuccess());
      actionCreators.getMedicamentList()(dispatch, getState);
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Post",
      "GetPosts",
      err,
      actionsList.deleteMedicamentListRequestError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(actionsList.deleteMedicamentListRequest());
  },
  addNewMedicament: actionsList.addNewMedicament,
  setNewValue: actionsList.setNewValue,
  deleteMedicament: actionsList.deleteMedicament,
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
