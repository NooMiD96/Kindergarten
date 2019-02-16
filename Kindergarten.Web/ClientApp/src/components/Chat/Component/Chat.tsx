import * as React from "react";
import { List, Avatar } from "antd";
import Input from "@core/antd/Input";

import { IMessage } from "../State";
import Colors from "./styles/chat.background";
import ChatWrapped from "./styles/chat.style";

import { TState, TComponentState } from "../TState";

export class Chat extends React.Component<TState, TComponentState> {
    state: TComponentState = {
        message: "",
        color: Colors[0],
        isAutoscroll: true,
    };
    list: any;

    componentDidMount() {
        this.props.SubscribeToChat();
        this.list = document.getElementById("list-container-for-chat");
    }

    componentWillUnmount() {
        this.props.UnubscribeToChat();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onChangeMessage = (e: any) => this.setState({
        ...this.state,
        message: e.target.value,
    })

    onPressEnterHandler = (_e: any) => {
        const message = this.state.message.trim();
        if (message) {
            const { sendMessage, userName } = this.props;
            sendMessage(userName || "", message, new Date());

            this.scrollToBottom();
            this.setState({
                ...this.state,
                message: "",
            });
        }
    }

    scrollToBottom = () => {
        if (this.state.isAutoscroll) {
            this.list.scrollTop = this.list.scrollHeight;
        }
    }

    ScrollHandler = (event: any) => {
        const div = event.target;
        if (this.state.isAutoscroll) {
            // div.offsetHeight + div.scrollTop <= div.scrollHeight
            const height = (div.scrollTop + div.offsetHeight + 40) - div.scrollHeight;
            if (height < 0) {
                this.setState({
                    ...this.state,
                    isAutoscroll: !this.state.isAutoscroll,
                });
            }
        } else {
            const height = (div.scrollTop + div.offsetHeight + 40) - div.scrollHeight;
            if (height > 0) {
                this.setState({
                    ...this.state,
                    isAutoscroll: !this.state.isAutoscroll,
                });
            }
        }
    }

    render() {
        const props = this.props;
        let inputContent;

        if (props.userName) {
            inputContent = <Input
                addonBefore={this.props.userName}
                addonAfter={`Online: ${props.countOfConnections}`}
                placeholder="Enter your message"
                onChange={this.onChangeMessage}
                onPressEnter={this.onPressEnterHandler}
                className="input-message-enabled"
                value={this.state.message}
            />;
        } else {
            inputContent = <Input
                addonBefore="Login"
                placeholder="Login in site to send the message"
                className="input-message-disabled"
                disabled
            />;
        }

        return <ChatWrapped>
            <List
                id="list-container-for-chat"
                className="list-container"
                dataSource={props.messages}
                onScroll={this.ScrollHandler}
                renderItem={(item: IMessage) => (
                    <List.Item
                        key={item.date.getSeconds()}
                        className={item.userName === props.userName ? "author" : ""}
                    >
                        <List.Item.Meta
                            avatar={
                                <div
                                    title={`Author: ${item.userName}\nTime: ${item.date.toLocaleString()}`}
                                    className="div-avatar"
                                >
                                    <Avatar
                                        style={{ backgroundColor: this.state.color, verticalAlign: "middle" }}
                                        size="large"
                                    >{item.userName}</Avatar>
                                </div>
                            }
                        />
                        <div>{item.messageInner}</div>
                    </List.Item>
                )}
            >
            </List>
            {inputContent}
        </ChatWrapped>;
    }
}
