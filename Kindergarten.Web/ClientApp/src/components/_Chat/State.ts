// -----------------
// STATE
export interface ChatState {
    socket?: WebSocket;
    messages: IMessage[];
    countOfConnections: number;
}
export interface IMessage {
    userName: string;
    messageInner: string;
    date: Date;
}

export const unloadedState: ChatState = { messages: [], countOfConnections: 0 };
