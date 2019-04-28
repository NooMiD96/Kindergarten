import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Input, List, Icon, Divider, Button, Row, Col } from "@core/antd";
import * as moment from "moment";

import { TState, TComponentState } from "@components/Visitation/TVisitation";
import { IVisitation } from "@components/Visitation/State";

export class Medicament extends React.Component<TState, TComponentState> {
  state: TComponentState = {
  };

  componentDidMount() {
    this.props.getVisitationList();
  }

  changeVisitationDate() {
    this.props.getVisitationList();
  }

  saveVisitation(visitation: IVisitation[]) {
    this.props.saveVisitationList(visitation);
  }

  render() {
    const { errorInner, cleanErrorInner, pending } = this.props;

    return (
      <React.Fragment>
        {
          errorInner && <Alert
            message="Error"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        }
        <Spin
          spinning={pending}
        >
          {/* Date picker */}
          {/* 2 list picker */}
        </Spin>
      </React.Fragment>
    );
  }
}
