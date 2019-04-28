// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IVisitationState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IVisitationState> = (state: IVisitationState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_VISITATION_LIST_REQUEST:
    case t.SAVE_VISITATION_LIST_REQUEST:
      return <IVisitationState>{
        ...state,
        pending: true,
      };

    case t.GET_VISITATION_LIST_REQUEST_SUCCESS:
      return <IVisitationState>{
        ...state,
        pending: false,
        visitationList: action.visitationList,
      };

    case t.SAVE_VISITATION_LIST_REQUEST_SUCCESS:
      return <IVisitationState>{
        ...state,
        pending: false,
      };

    case t.GET_VISITATION_LIST_REQUEST_ERROR:
    case t.SAVE_VISITATION_LIST_REQUEST_ERROR:
      return <IVisitationState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.CLEAN_ERROR_INNER:
      return <IVisitationState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
