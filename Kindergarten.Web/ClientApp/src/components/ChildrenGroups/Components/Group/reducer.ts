// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IGroupState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IGroupState> = (state: IGroupState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.DELETE_CHILDREN_LIST_REQUEST:
    case t.CHANGE_CHILDREN_LIST_REQUEST:
    case t.GET_CHILDREN_LIST_REQUEST:
      return <IGroupState>{
        ...state,
        pending: true,
      };

    case t.DELETE_CHILDREN_LIST_REQUEST_SUCCESS:
    case t.CHANGE_CHILDREN_LIST_REQUEST_SUCCESS:
      return <IGroupState>state;

    case t.GET_CHILDREN_LIST_REQUEST_SUCCESS:
      return <IGroupState>{
        ...state,
        pending: false,
        childrenList: action.childrenList,
      };

    case t.DELETE_CHILDREN_LIST_REQUEST_ERROR:
    case t.CHANGE_CHILDREN_LIST_REQUEST_ERROR:
    case t.GET_CHILDREN_LIST_REQUEST_ERROR:
      return <IGroupState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.ADD_NEW_CHILDREN:
      return <IGroupState>{
        ...state,
        childrenList: [action.children, ...state.childrenList!.filter(Boolean)],
      };

    case t.CLEAN_ERROR_INNER:
      return <IGroupState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
