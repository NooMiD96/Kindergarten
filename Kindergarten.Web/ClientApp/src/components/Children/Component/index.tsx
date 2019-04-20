import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin } from "@core/antd";

import { TState, TComponentState } from "@components/Children/TChildren";
import { IChildren } from "@components/Children/State";

export class Children extends React.Component<TState, TComponentState> {
  componentDidMount() {
    const { childrenId } = this.props.match.params;
    this.props.getChildren(childrenId);
  }

  render() {
    const { errorInner, cleanErrorInner, pending } = this.props;

    return (
      <React.Fragment>
        {
          errorInner && <Alert
            message="Ошибка"
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

        </Spin>
      </React.Fragment>
    );
  }
}
