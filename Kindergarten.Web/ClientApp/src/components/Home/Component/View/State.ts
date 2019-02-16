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
    commentsCount: 0,
    commentsList: [],
  },
  pending: false,
  errorInner: "",
};
