// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IReportState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IReportState> = (state: IReportState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_VISITATION_REPORT_REQUEST:
    case t.GET_VACCINATION_REPORT_REQUEST:
      return <IReportState>{
        ...state,
        pending: true,
      };

    case t.GET_VISITATION_REPORT_REQUEST_SUCCESS:
      return <IReportState>{
        ...state,
        pending: false,
        visitationReport: action.visitationReport,
      };

    case t.GET_VACCINATION_REPORT_REQUEST_SUCCESS:
      return <IReportState>{
        ...state,
        pending: false,
        vaccinationReport: action.vaccinationReport,
      };

    case t.GET_VISITATION_REPORT_REQUEST_ERROR:
    case t.GET_VACCINATION_REPORT_REQUEST_ERROR:
      return <IReportState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.CLEAN_ERROR_INNER:
      return <IReportState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
