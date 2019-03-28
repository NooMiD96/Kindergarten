import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";

import { TRegistrationModel, TAuthenticationModel, TUserModel } from "./TAccount";
import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
import { GetXsrf, XPT, GetXsrfToHeader } from "@core/helpers/auth/xsrf";

// ----------------
// ACTIONS
export const ActionsList = {
  registrationRequest: (): t.IRegistrationRequest => ({
    type: t.REGISTRATION_REQUEST,
  }),
  registrationSuccess: (): t.IRegistrationSuccess => ({
    type: t.REGISTRATION_SUCCESS,
  }),
  registrationError: (errorMessage: string): t.IRegistrationError => ({
    type: t.REGISTRATION_ERROR,
    errorMessage,
  }),
  authenticationRequest: (): t.IAuthenticationRequest => ({
    type: t.AUTHENTICATION_REQUEST,
  }),
  authenticationSuccess: (): t.IAuthenticationSuccess => ({
    type: t.AUTHENTICATION_SUCCESS,
  }),
  authenticationError: (errorMessage: string): t.IAuthenticationError => ({
    type: t.AUTHENTICATION_ERROR,
    errorMessage,
  }),
  logoutRequest: (): t.ILogoutRequest => ({
    type: t.LOGOUT_REQUEST,
  }),
  logoutSuccess: (): t.ILogoutSuccess => ({
    type: t.LOGOUT_SUCCESS,
  }),
  logoutError: (errorMessage: string): t.ILogoutError => ({
    type: t.LOGOUT_ERROR,
    errorMessage,
  }),
  setUser: (user: TUserModel): t.ISetUser => ({
    type: t.SET_USER,
    user,
  }),
  removeErrorMessage: (): t.IRemoveErrorMessage => ({
    type: t.REMOVE_ERROR_MESSAGE,
  }),
  setXsrf: (xpt: XPT): t.ISetXPTAction => ({
    type: t.SET_XPT,
    xpt,
  }),
};
// ----------------
// ACTION CREATORS
const uncatchError = "Упс... Что-то пошло не так... Пожалуйста, повторите попытку";
export const ActionCreators = {
  registration: (data: TRegistrationModel): AppThunkAction<t.TRegistration | t.ISetUser | t.ISetXPTAction> => (dispatch, _getState) => {
    const fetchTask = fetch("/api/Account/Registration", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then(async (value: IResponse<TUserModel>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      let xpt: false | XPT | undefined;

      try {
        xpt = await GetXsrf(data);
      } catch (err) {
        return errorCreater(err.message);
      }

      if (xpt) {
        dispatch(ActionsList.registrationSuccess());
        dispatch(ActionsList.setUser(value.data));
        dispatch(ActionsList.setXsrf(xpt));
      } else {
        return errorCreater(uncatchError);
      }

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Account",
      "Registration",
      err,
      ActionsList.registrationError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.registrationRequest());
  },
  authentication: (data: TAuthenticationModel): AppThunkAction<t.TAuthentication | t.ISetUser | t.ISetXPTAction> => (dispatch, _getState) => {
    const fetchTask = fetch("/api/Account/Authentication", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then(async (value: IResponse<TUserModel>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      let xpt: false | XPT | undefined;

      try {
        xpt = await GetXsrf(data);
      } catch (err) {
        return errorCreater(err.message);
      }

      if (xpt) {
        dispatch(ActionsList.authenticationSuccess());
        dispatch(ActionsList.setUser(value.data));
        dispatch(ActionsList.setXsrf(xpt));
      } else {
        return errorCreater(uncatchError);
      }
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Account",
      "Authentication",
      err,
      ActionsList.authenticationError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.authenticationRequest());
  },
  logout: (): AppThunkAction<t.TLogout> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Account/Logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<string>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      dispatch(ActionsList.logoutSuccess());
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Account",
      "Logout",
      err,
      ActionsList.logoutError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.logoutRequest());
  },
  removeErrorMessage: ActionsList.removeErrorMessage,
};
