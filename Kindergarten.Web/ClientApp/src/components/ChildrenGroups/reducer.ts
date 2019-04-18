// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IChildrenGroupsState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IChildrenGroupsState> = (state: IChildrenGroupsState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.DELETE_CHILDREN_GROUPS_REQUEST:
    case t.CHANGE_CHILDREN_GROUPS_REQUEST:
    case t.GET_CHILDREN_GROUPS_REQUEST:
      return <IChildrenGroupsState>{
        ...state,
        pending: true,
      };

    case t.DELETE_CHILDREN_GROUPS_REQUEST_SUCCESS:
    case t.CHANGE_CHILDREN_GROUPS_REQUEST_SUCCESS:
      return <IChildrenGroupsState>state;

    case t.GET_CHILDREN_GROUPS_REQUEST_SUCCESS:
      return <IChildrenGroupsState>{
        ...state,
        pending: false,
        childrenGroupsList: action.childrenGroups,
      };

    case t.DELETE_CHILDREN_GROUPS_REQUEST_ERROR:
    case t.CHANGE_CHILDREN_GROUPS_REQUEST_ERROR:
    case t.GET_CHILDREN_GROUPS_REQUEST_ERROR:
      return <IChildrenGroupsState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.ADD_NEW_CHILDREN_GROUP:
      return <IChildrenGroupsState>{
        ...state,
        childrenGroupsList: [action.childrenGroup, ...state.childrenGroupsList.filter(Boolean)],
      };

    case t.CLEAN_ERROR_INNER:
      return <IChildrenGroupsState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
