// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { PostViewState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer = (state: PostViewState, action: KnownAction) => {
    switch (action.type) {
        case t.GET_POST_REQUEST:
            return {
                ...state,
                post: {
                    ...state.post,
                    postId: action.postId,
                },
                pending: true,
            };

        case t.GET_POST_REQUEST_SUCCESS:
            return {
                ...state,
                post: {
                    postId: action.data.postId,
                    author: action.data.author,
                    header: action.data.header,
                    context: action.data.context,
                    date: action.data.date,
                    imgUrl: action.data.imgUrl,
                    commentsCount: action.data.commentCount,
                    commentsList: action.data.commentList,
                },
                pending: false,
            };

        case t.DELETE_COMMENT_LIST_REQUEST_ERROR:
        case t.DELETE_POST_REQUEST_ERROR:
        case t.GET_POST_REQUEST_ERROR:
        case t.SEND_COMMENT_REQUEST_ERROR:
        case t.GET_COMMENTS_REQUEST_ERROR:
            return {
                ...state,
                pending: false,
                errorInner: action.errorMessage,
            };

        case t.DELETE_COMMENT_LIST_REQUEST:
        case t.DELETE_POST_REQUEST:
        case t.SEND_COMMENT_REQUEST:
        case t.GET_COMMENTS_REQUEST:
            return {
                ...state,
                pending: true,
            };

        case t.SEND_COMMENT_REQUEST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    commentsList: [...state.post.commentList, action.comment],
                },
                pending: false,
            };

        case t.GET_COMMENTS_REQUEST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    commentsList: action.commentsList,
                    commentsCount: action.commentsList.length,
                },
                pending: false,
            };

        case t.CLEANE_POST_DATA:
            return unloadedState;

        case t.DELETE_POST_REQUEST_SUCCESS:
        case t.DELETE_COMMENT_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                pending: false,
            };

        case t.CLEAN_ERROR_INNER:
            return {
                ...state,
                errorInner: "",
            };

        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
