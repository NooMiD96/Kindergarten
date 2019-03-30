import { RouteComponentProps } from "react-router-dom";

import { PostEditState } from "./State";
import { IPost } from "@components/Home/State";
import { ActionCreators } from "./actions";
import { ActionCreators as HomeActions } from "@components/Home/actions";
import { ActionCreators as ViewActions } from "@components/Home/Component/View/actions";

import { FormComponentProps } from "@core/antd/Form";
import { UserTypeEnums } from "@core/constants";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = { checkedList: any };
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = PostEditState & FormComponentProps & {
    post: IPost,
    userRole: UserTypeEnums,
} & RouteComponentProps<{id: string}>;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
    & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof ActionCreators & {
    getPosts: typeof HomeActions.getPosts,
    getPost: typeof ViewActions.getPost,
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
    & TMapDispatchToProps;
// -----------------------------
// MODELS
