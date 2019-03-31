import { RouterState } from "connected-react-router";
import { AccountState } from "@src/components/Account/IAccountState";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { IHomeState } from "@components/Home/State";
import { reducer as HomeReducer } from "@components/Home/reducer";
import { IPostViewState } from "@components/Home/Components/View/State";
import { reducer as PostViewReducer } from "@components/Home/Components/View/reducer";
import { PostEditState } from "@components/Home/Components/Edit/State";
import { reducer as PostEditReducer } from "@components/Home/Components/Edit/reducer";

import { ChatState } from "@components/Chat/State";
import { reducer as ChatReducer } from "@components/Chat/reducer";

export interface ApplicationState {
    account: AccountState;
    router: RouterState;
    home: IHomeState;
    postView: IPostViewState;
    postEdit: PostEditState;
    chat: ChatState;
}

export const reducers = {
    account: AccountReducer,
    home: HomeReducer,
    postView: PostViewReducer,
    postEdit: PostEditReducer,
    chat: ChatReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
