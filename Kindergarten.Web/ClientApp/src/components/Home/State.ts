// -----------------
//#region STATE
export interface IHomeState {
  postList: IPost[];
  totalCount: number;
  pending: boolean;
  errorInner: string;
}

export interface IPost {
  postId: number;
  author: string;
  header: string;
  content: string;
  date: Date;
  imgUrl?: string;
  commentCount: number;
  commentList: IComment[];
}

export interface IComment {
  commentId: number;
  content: string;
  date: Date;
  author: string;
}

export const unloadedState: IHomeState = {
  postList: [],
  totalCount: 0,
  pending: false,
  errorInner: "",
};
//#endregion
