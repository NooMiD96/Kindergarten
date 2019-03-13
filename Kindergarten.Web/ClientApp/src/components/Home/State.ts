
export interface HomeState {
  postList: Post[];
  totalCount: number;
  pending: boolean;
  errorInner: string;
}

export interface Post {
  postId: number;
  author: string;
  header: string;
  context: string;
  date: Date;
  imgUrl?: string;
  commentCount: number;
  commentList: Comment[];
}

export interface Comment {
  commentId: number;
  commentInner: string;
  date: Date;
  userName: string;
}

export const unloadedState: HomeState = {
  postList: [],
  totalCount: 0,
  pending: false,
  errorInner: "",
};
