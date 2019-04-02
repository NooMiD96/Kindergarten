import { connect } from "react-redux";

import { actionCreators } from "./actions";
import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./TMedicament";
import { Medicament } from "./Component";
import { ApplicationState } from "@src/Store";

const mapStateToProps = (state: ApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.medicament,
    userRole: state.account.userType,
    ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
    ...actionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Medicament as any) as any;
