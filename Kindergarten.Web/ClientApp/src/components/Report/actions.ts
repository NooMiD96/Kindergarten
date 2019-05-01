import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { IVisitationReport } from "./State";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

// ----------------
//#region ACTIONS
export const actionsList = {
  getVisitationReportRequest: (): t.IGetVisitationReportRequestAction => ({
    type: t.GET_VISITATION_REPORT_REQUEST,
  }),
  getVisitationReportRequestSuccess: (visitationReport: IVisitationReport): t.IGetVisitationReportRequestSuccessAction => ({
    type: t.GET_VISITATION_REPORT_REQUEST_SUCCESS,
    visitationReport,
  }),
  getVisitationReportRequestError: (errorMessage: string): t.IGetVisitationReportRequestErrorAction => ({
    type: t.GET_VISITATION_REPORT_REQUEST_ERROR,
    errorMessage,
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Visitation";
export const actionCreators = {
  getVisitationReport: (): AppThunkAction<t.TGetVisitationReport | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const controllerName = "Visitation";
    const apiUrl = "GetVisitationReport";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        // "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IVisitationReport>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getVisitationReportRequestSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getVisitationReportRequestError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getVisitationReportRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
