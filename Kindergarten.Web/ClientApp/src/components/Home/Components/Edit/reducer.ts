// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { PostEditState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer = (state: PostEditState, action: KnownAction) => {
  switch (action.type) {
    case t.CREATE_EDIT_POST_REQUEST:
      return {
        ...state,
        pending: true,
      } as PostEditState;

    case t.CREATE_EDIT_POST_SUCCESS:
      return {
        ...state,
        pending: false,
      } as PostEditState;

    case t.CREATE_EDIT_POST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      } as PostEditState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as PostEditState;

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
//#endregion
