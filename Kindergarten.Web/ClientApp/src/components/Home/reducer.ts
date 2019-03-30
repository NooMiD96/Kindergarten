// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IHomeState, IPost, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer = (state: IHomeState, action: KnownAction) => {
    switch (action.type) {
        case t.GET_POST_LIST_REQUEST:
            return {
                ...state,
                pending: true,
            } as IHomeState;

        case t.GET_POST_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                pending: false,
                postList: action.postList,
                totalCount: action.totalCount,
            } as IHomeState;

        case t.GET_POST_LIST_REQUEST_ERROR:
            return {
                ...state,
                pending: false,
                errorInner: action.errorMessage,
            } as IHomeState;

        case t.CLEAN_ERROR_INNER:
            return {
                ...state,
                errorInner: "",
            } as IHomeState;

        default:
            const exhaustiveCheck: never = action;
            if (state && state.postList) {
                state.postList.forEach((item: IPost) => item.date = new Date(item.date));
            }
    }

    return state || unloadedState;
};
