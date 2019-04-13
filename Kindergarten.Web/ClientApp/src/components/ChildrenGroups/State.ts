// -----------------
//#region STATE
export interface IGroupState {
  groupId: number;
  groupName: string;
  childrenList: IChildren;
}

export interface IChildren {
  childrenId: number;
  firstName: string;
  lastName: string;
}

export interface Doctor {
  Id: number;
  FirstName: string;
  SecondName: string;
}
export interface Visitor {
  Id: number;
  FirstName: string;
  SecondName: string;
  Date: Date;
  Male: boolean;
}

export const unloadedState: IGroupState = {
  medicamentList: [],
  pending: false,
  errorInner: "",
};
//#endregion
