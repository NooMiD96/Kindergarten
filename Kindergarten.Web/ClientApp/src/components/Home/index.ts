import { connect } from "react-redux";

import { ActionCreators } from "./actions";
import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./THome";
import { Home } from "@components/Home/Components/Component";
import { ApplicationState } from "@src/Store";

const mapStateToProps = (state: ApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.post,
    userRole: state.account.userType,
    ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
    ...ActionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Home as any) as any;
