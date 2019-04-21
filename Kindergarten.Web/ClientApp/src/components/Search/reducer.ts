// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ISearchState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ISearchState> = (state: ISearchState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.SEARCH_CHILDREN_LIST_REQUEST:
      return <ISearchState>{
        ...state,
        pending: true,
      };

    case t.SEARCH_CHILDREN_LIST_REQUEST_SUCCESS:
      return <ISearchState>{
        ...state,
        pending: false,
        childrenList: action.childrenList,
      };

    case t.SEARCH_CHILDREN_LIST_REQUEST_ERROR:
      return <ISearchState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.CLEAN_ERROR_INNER:
      return <ISearchState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
