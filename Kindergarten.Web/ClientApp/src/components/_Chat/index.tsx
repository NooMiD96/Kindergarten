import { connect } from "react-redux";

import { ActionCreators } from "./actions";
import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./TState";
import { Chat } from "./Component/Chat";
import { ApplicationState } from "@src/Store";

const mapStateToProps = (state: ApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.chat,
    userName: state.account.userName,
    ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
    ...ActionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Chat as any);
