import { connect } from "react-redux";

import { ActionCreators } from "./actions";
import { ActionCreators as HomeActions } from "@components/Home/actions";
import { ActionCreators as ViewActions } from "@components/Home/Component/View/actions";
import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./TEdit";
import { EditForm } from "./Component/Edit";
import { ApplicationState } from "@src/Store";

const mapStateToProps = (state: ApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.postEdit,
    userRole: state.account.userType,
    post: state.postView.post,
    ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
    ...ActionCreators,
    getPosts: HomeActions.getPosts,
    getPost: ViewActions.getPost,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(EditForm as any) as any;
