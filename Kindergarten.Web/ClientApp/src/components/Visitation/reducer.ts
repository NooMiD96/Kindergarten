// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { TransferItem } from "@core/antd/Transfer";
import { IVisitationState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IVisitationState> = (state: IVisitationState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_VISITATION_LIST_REQUEST:
    case t.SAVE_VISITATION_LIST_REQUEST:
      return <IVisitationState>{
        ...state,
        pending: true,
      };

    case t.GET_VISITATION_LIST_REQUEST_SUCCESS:
      const transferData: TransferItem[] = [];
      const targetKeys: string[] = [];

      action.visitationList.forEach(x => {
        transferData.push({
          key: x.childrenId.toString(),
          title: `${x.children.secondName} ${x.children.firstName}`,
        });

        if (x.visited) {
          targetKeys.push(x.childrenId.toString());
        }
      });

      return <IVisitationState>{
        ...state,
        pending: false,
        visitationList: action.visitationList,
        transferData,
        targetKeys,
      };

    case t.SAVE_VISITATION_LIST_REQUEST_SUCCESS:
      return <IVisitationState>{
        ...state,
        pending: false,
      };

    case t.GET_VISITATION_LIST_REQUEST_ERROR:
    case t.SAVE_VISITATION_LIST_REQUEST_ERROR:
      return <IVisitationState>{
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

    case t.CHANGE_TARGET_LIST:
      return <IVisitationState>{
        ...state,
        targetKeys: action.targetKeys,
      };

    case t.CLEAN_ERROR_INNER:
      return <IVisitationState>{
        ...state,
        errorInner: "",
      };

    default:
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
