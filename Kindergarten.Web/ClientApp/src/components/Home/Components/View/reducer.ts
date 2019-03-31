// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IPostViewState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer = (state: IPostViewState, action: KnownAction) => {
    switch (action.type) {
        case t.GET_POST_REQUEST:
            return {
                ...state,
                post: {
                    ...state.post,
                    postId: action.postId,
                },
                pending: true,
            } as IPostViewState;

        case t.GET_POST_REQUEST_SUCCESS:
            return {
                ...state,
                post: {
                    postId: action.data.postId,
                    author: action.data.author,
                    header: action.data.header,
                    content: action.data.content,
                    date: action.data.date,
                    imgUrl: action.data.imgUrl,
                    commentCount: action.data.commentCount,
                    commentList: action.data.commentList,
                },
                pending: false,
            } as IPostViewState;

        case t.DELETE_COMMENT_LIST_REQUEST_ERROR:
        case t.DELETE_POST_REQUEST_ERROR:
        case t.GET_POST_REQUEST_ERROR:
        case t.SEND_COMMENT_REQUEST_ERROR:
        case t.GET_COMMENTS_REQUEST_ERROR:
            return {
                ...state,
                pending: false,
                errorInner: action.errorMessage,
            } as IPostViewState;

        case t.DELETE_COMMENT_LIST_REQUEST:
        case t.DELETE_POST_REQUEST:
        case t.SEND_COMMENT_REQUEST:
        case t.GET_COMMENTS_REQUEST:
            return {
                ...state,
                pending: true,
            } as IPostViewState;

        case t.SEND_COMMENT_REQUEST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    commentList: [...state.post.commentList, action.comment],
                },
                pending: false,
            } as IPostViewState;

        case t.GET_COMMENTS_REQUEST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    commentList: action.commentList,
                    commentsCount: action.commentList.length,
                },
                pending: false,
            } as IPostViewState;

        case t.CLEANE_POST_DATA:
            return unloadedState;

        case t.DELETE_POST_REQUEST_SUCCESS:
        case t.DELETE_COMMENT_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                pending: false,
            } as IPostViewState;

        case t.CLEAN_ERROR_INNER:
            return {
                ...state,
                errorInner: "",
            } as IPostViewState;

        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
