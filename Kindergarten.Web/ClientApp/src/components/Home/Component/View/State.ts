import { Post } from "@components/Home/State";
// -----------------
// STATE
export interface PostViewState {
  post: Post;
  pending: boolean;
  errorInner: string;
}

export const unloadedState: PostViewState = {
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
