import { IPost } from "@components/Home/State";
// -----------------
// STATE
export interface IPostViewState {
  post: IPost;
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IPostViewState = {
  post: {
    postId: 0,
    author: "",
    header: "",
    context: "",
    date: new Date(),
    commentCount: 0,
    commentList: [],
  },
  pending: false,
  errorInner: "",
};
