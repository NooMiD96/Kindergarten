import { RouterState } from "connected-react-router";
import { AccountState } from "@src/components/Account/IAccountState";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { HomeState as HomeState } from "@components/Home/State";
import { reducer as HomeReducer } from "@components/Home/reducer";
import { PostViewState } from "@components/Home/Component/View/State";
import { reducer as PostViewReducer } from "@components/Home/Component/View/reducer";
import { PostEditState } from "@components/Home/Component/Edit/State";
import { reducer as PostEditReducer } from "@components/Home/Component/Edit/reducer";

import { ChatState } from "@components/Chat/State";
import { reducer as ChatReducer } from "@components/Chat/reducer";

export interface ApplicationState {
    account: AccountState;
    router: RouterState;
    home: HomeState;
    postView: PostViewState;
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
