import { RouterState } from "connected-react-router";
import { AccountState } from "@src/components/Account/IAccountState";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { IHomeState } from "@components/Home/State";
import { reducer as HomeReducer } from "@components/Home/reducer";
import { IPostViewState } from "@components/Home/Components/View/State";
import { reducer as PostViewReducer } from "@components/Home/Components/View/reducer";
import { PostEditState } from "@components/Home/Components/Edit/State";
import { reducer as PostEditReducer } from "@components/Home/Components/Edit/reducer";

import { IMedicamentState } from "@components/Medicament/State";
import { reducer as MedicamentReducer } from "@components/Medicament/reducer";

import { IChildrenState } from "@components/ChildrenGroups/Components/Group/Components/Children/State";
import { reducer as ChildrenReducer } from "@components/ChildrenGroups/Components/Group/Components/Children/reducer";
import { IGroupState } from "@components/ChildrenGroups/Components/Group/State";
import { reducer as GroupReducer } from "@components/ChildrenGroups/Components/Group/reducer";
// import { IMedicamentState } from "@components/Medicament/State";
// import { reducer as MedicamentReducer } from "@components/Medicament/reducer";

// import { ChatState } from "@components/Chat/State";
// import { reducer as ChatReducer } from "@components/Chat/reducer";

export interface ApplicationState {
  router: RouterState;

  account: AccountState;

  post: IHomeState;
  postView: IPostViewState;
  postEdit: PostEditState;

  medicament: IMedicamentState;

  children: IChildrenState;
  group: IGroupState;
  // chat: ChatState;
}

export const reducers = {
  account: AccountReducer,

  post: HomeReducer,
  postView: PostViewReducer,
  postEdit: PostEditReducer,

  medicament: MedicamentReducer,

  children: ChildrenReducer,
  group: GroupReducer,
  // chat: ChatReducer,
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
