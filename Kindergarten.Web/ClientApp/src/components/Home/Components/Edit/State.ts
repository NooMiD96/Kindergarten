// -----------------
//#region STATE
export interface PostEditState {
  pending: boolean;
  errorInner: string;
}

export const unloadedState: PostEditState = {
  pending: false,
  errorInner: "",
};
//#endregion
