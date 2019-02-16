// -----------------
//#region ACTIONS TYPE
export const CREATE_EDIT_POST_REQUEST = "CREATE_EDIT_POST_REQUEST";
export const CREATE_EDIT_POST_SUCCESS = "CREATE_EDIT_POST_SUCCESS";
export const CREATE_EDIT_POST_ERROR = "CREATE_EDIT_POST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface ICreateEditPostRequestAction { type: typeof CREATE_EDIT_POST_REQUEST; }
export interface ICreateEditPostSuccessAction { type: typeof CREATE_EDIT_POST_SUCCESS; }
export interface ICreateEditPostErrorAction { type: typeof CREATE_EDIT_POST_ERROR; errorMessage: string; }
export type TCreateEditPostRequest = ICreateEditPostRequestAction | ICreateEditPostSuccessAction | ICreateEditPostErrorAction;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER; }

type KnownAction = TCreateEditPostRequest | ICleanErrorInnerAction;
export default KnownAction;
//#endregion
