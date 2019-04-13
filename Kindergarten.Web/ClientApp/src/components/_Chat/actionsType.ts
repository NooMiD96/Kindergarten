import { IMessage } from "./State";
// -----------------
// ACTIONS TYPE
export const SUBSCRIBE_TO_CHAT = "SUBSCRIBE_TO_CHAT";
export const UNSUBSCRIBE_TO_CHAT = "UNSUBSCRIBE_TO_CHAT";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const GET_MESSAGE = "GET_MESSAGE";
export const SET_COUNT_OF_CONNECTIONS = "SET_COUNT_OF_CONNECTIONS";
// -----------------
// ACTIONS INTERFACE
export interface ISubscribeToChatAction { type: typeof SUBSCRIBE_TO_CHAT; socket: WebSocket; }
export interface IUnsubscribeToChatAction { type: typeof UNSUBSCRIBE_TO_CHAT; }

export interface IGetMessageAction { type: typeof GET_MESSAGE; message: IMessage; }
export interface ISetCountOfConnectionsAction { type: typeof SET_COUNT_OF_CONNECTIONS; countOfConnections: number; }

type KnownAction = ISubscribeToChatAction | IUnsubscribeToChatAction | IGetMessageAction | ISetCountOfConnectionsAction;
export default KnownAction;
