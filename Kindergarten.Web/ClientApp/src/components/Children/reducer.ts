// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IChildrenState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IChildrenState> = (state: IChildrenState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.DELETE_CHILDREN_REQUEST:
    case t.CHANGE_CHILDREN_REQUEST:
    case t.GET_CHILDREN_REQUEST:
      return <IChildrenState>{
        ...state,
        pending: true,
      };

    case t.DELETE_CHILDREN_REQUEST_SUCCESS:
    case t.CHANGE_CHILDREN_REQUEST_SUCCESS:
      return <IChildrenState>state;

    case t.GET_CHILDREN_REQUEST_SUCCESS:
      return <IChildrenState>{
        ...state,
        pending: false,
        children: action.children,
      };

    case t.DELETE_CHILDREN_REQUEST_ERROR:
    case t.CHANGE_CHILDREN_REQUEST_ERROR:
    case t.GET_CHILDREN_REQUEST_ERROR:
      return <IChildrenState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.CLEAN_ERROR_INNER:
      return <IChildrenState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
