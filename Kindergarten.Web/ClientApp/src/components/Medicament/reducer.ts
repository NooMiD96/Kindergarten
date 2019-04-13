// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IMedicamentState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IMedicamentState> = (state: IMedicamentState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.DELETE_MEDICAMENT_LIST_REQUEST:
    case t.CHANGE_MEDICAMENT_LIST_REQUEST:
    case t.GET_MEDICAMENT_LIST_REQUEST:
      return <IMedicamentState>{
        ...state,
        pending: true,
      };

    case t.DELETE_MEDICAMENT_LIST_REQUEST_SUCCESS:
    case t.CHANGE_MEDICAMENT_LIST_REQUEST_SUCCESS:
      return <IMedicamentState>state;

    case t.GET_MEDICAMENT_LIST_REQUEST_SUCCESS:
      return <IMedicamentState>{
        ...state,
        pending: false,
        medicamentList: action.medicamentList.map(x => {
          x.expirationDate = new Date(x.expirationDate);
          return x;
        }),
      };

    case t.DELETE_MEDICAMENT_LIST_REQUEST_ERROR:
    case t.CHANGE_MEDICAMENT_LIST_REQUEST_ERROR:
    case t.GET_MEDICAMENT_LIST_REQUEST_ERROR:
      return <IMedicamentState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.ADD_NEW_MEDICAMENT:
      return <IMedicamentState>{
        ...state,
        medicamentList: [action.medicament, ...state.medicamentList.filter(Boolean)],
      };

    case t.CLEAN_ERROR_INNER:
      return <IMedicamentState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
