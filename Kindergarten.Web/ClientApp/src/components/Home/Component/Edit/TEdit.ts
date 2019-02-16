import { RouteComponentProps } from "react-router-dom";

import { PostEditState } from "./State";
import { Post } from "@components/Home/State";
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
    post: Post,
    userRole: UserTypeEnums,
} & RouteComponentProps<{id: string}>;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
    & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof ActionCreators & {
    GetPosts: typeof HomeActions.GetPosts,
    GetPost: typeof ViewActions.GetPost,
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
    & TMapDispatchToProps;
// -----------------------------
// MODELS
