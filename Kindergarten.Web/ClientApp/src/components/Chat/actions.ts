// import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
// import { IResponse } from "@core/fetchHelper/IResponses";
import { IMessage } from "./State";

import * as t from "./actionsType";
// import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
// ----------------
// ACTIONS
export const ActionsList = {
  SubscribeToChat: (socket: WebSocket): t.ISubscribeToChatAction => ({
    type: t.SUBSCRIBE_TO_CHAT,
    socket,
  }),
  UnsubscribeToChat: (): t.IUnsubscribeToChatAction => ({
    type: t.UNSUBSCRIBE_TO_CHAT,
  }),
  GetMessage: (message: IMessage): t.IGetMessageAction => ({
    type: t.GET_MESSAGE,
    message,
  }),
  SetCountOfConnections: (countOfConnections: number): t.ISetCountOfConnectionsAction => ({
    type: t.SET_COUNT_OF_CONNECTIONS,
    countOfConnections,
  }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
  SubscribeToChat: (): AppThunkAction<t.ISubscribeToChatAction | t.IGetMessageAction | t.ISetCountOfConnectionsAction> => (dispatch, getState) => {
    const hostUri = document.baseURI || "http://localhost:50000/";
    const socketUri = hostUri.replace(/^http(s)?/, "ws") + "wschat";
    const socket = new WebSocket(socketUri);

    socket.onmessage = (event) => {
      try {
        let data = JSON.parse(event.data) as { message: IMessage, countOfConnections: number };
        if (data.message) {
          data.message.date = new Date(data.message.date);
          dispatch(ActionsList.GetMessage(data.message));
        }
        if (data.countOfConnections) {
          dispatch(ActionsList.SetCountOfConnections(data.countOfConnections));
        }
      } catch (err) {
        console.warn("WebSocket Error Parse :-S in Chat", err);
      }
    };
    socket.onopen = (_e) => {
      socket.send("GetMessages");
    };
    socket.onclose = (event) => {
      if (!event.wasClean) {
        console.group("Socket");
        console.log("Обрыв соединения");
        console.log("Код: " + event.code + " причина: " + event.reason);
        console.groupEnd();
      }
    };
    socket.onerror = (error) => {
      console.warn("Ошибка:\n" + error);
    };

    dispatch(ActionsList.SubscribeToChat(socket));
  },
  sendMessage: (userName: string, message: string, date: Date): AppThunkAction<void> => (_dispatch, getState) => {
    const socket = getState().chat.socket;
    if (socket) {
      socket.send(JSON.stringify({
        UserName: userName,
        MessageInner: message,
        Date: date.toUTCString(),
      }));
    }
  },
  UnubscribeToChat: ActionsList.UnsubscribeToChat,
};
