import { IGroupState } from "@components/Group/State";

// -----------------
//#region STATE
export interface IChildrenState {
  children: IChildren | null;
  pending: boolean;
  errorInner: string;
}

export interface IChildren {
  childrenId: number;
  firstName: string;
  secondName: string;
  childrenInformation?: IChildrenInformation;
  group: IGroupState;
}

export interface IChildrenInformation {
  childrenId: number;
  fatherName: string;
  birthday: Date;
  male: boolean;
  address: string;
  phoneNumber: string;
  phoneNumber2: string;
  healthGroupId: number;
  healthGroup: IHealthGroup;

  firstVaccination: boolean;
  approveFirstVaccination: boolean;

  secondVaccination: boolean;
  approveSecondVaccination: boolean;

  thirdVaccination: boolean;
  approveThirdVaccination: boolean;

  fourthVaccination: boolean;
  approveFourthVaccination: boolean;

  info: string;
}

export interface IHealthGroup {
  number: number;
  description: string;
}

export const unloadedState: IChildrenState = {
  children: null,
  pending: false,
  errorInner: "",
};
//#endregion
