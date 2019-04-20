import * as React from "react";

import { IChildren, IChildrenInformation } from "@components/Children/State";

type TProp = {
  children: IChildren | null;
};

export class ChildrenCard extends React.Component<TProp, {}> {
  render() {
    const { children } = this.props;
    if (children === null) {
      return <div />;
    }

    const {
      firstName,
      secondName,
      childrenInformation = {} as IChildrenInformation,
    } = children;

    const {
      address = "",
      birthday = new Date(),
      male = true,
      phoneNumber = "",
      phoneNumber2 = "",
    } = childrenInformation;

    return (
      <React.Fragment>
        <div />
      </React.Fragment>
    );
  }
}

export default ChildrenCard;
