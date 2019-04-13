// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ChatState, IMessage, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer = (state: ChatState, action: KnownAction) => {
    switch (action.type) {
        case t.SUBSCRIBE_TO_CHAT:
            return {
                ...state,
                socket: action.socket,
            };

        case t.UNSUBSCRIBE_TO_CHAT:
            const socket = state.socket;
            if (socket) {
                socket.close();
            }
            return unloadedState;

        case t.GET_MESSAGE:
            let messages: IMessage[] = [];
            if (state.messages.length > 50) {
                messages = [...state.messages.slice(1), action.message];
            } else {
                messages = [...state.messages, action.message];
            }
            return {
                ...state,
                messages,
            };

        case t.SET_COUNT_OF_CONNECTIONS:
            return {
                ...state,
                countOfConnections: action.countOfConnections,
            };

        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
//#endregion
