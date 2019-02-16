// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { HomeState, Post, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer = (state: HomeState, action: KnownAction) => {
    switch (action.type) {
        case t.GET_POST_LIST_REQUEST:
            return {
                ...state,
                pending: true,
            } as HomeState;

        case t.GET_POST_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                pending: false,
                posts: action.posts,
                totalCount: action.totalCount,
            } as HomeState;

        case t.GET_POST_LIST_REQUEST_ERROR:
            return {
                ...state,
                pending: false,
                errorInner: action.errorMessage,
            } as HomeState;

        case t.CLEAN_ERROR_INNER:
            return {
                ...state,
                errorInner: "",
            } as HomeState;

        default:
            const exhaustiveCheck: never = action;
            if (state && state.postList) {
                state.postList.forEach((item: Post) => item.date = new Date(item.date));
            }
    }

    return state || unloadedState;
};
