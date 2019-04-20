import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Button } from "@core/antd";
import EditChildrenCard from "./EditChildrenCard";
import ChildrenCard from "./ChildrenCard";
import ChildrenWrapper from "./style/children.style";

import { TState, TComponentState } from "@components/Children/TChildren";
import { IChildren } from "@components/Children/State";

export class Children extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    isEdit: false,
  };

  componentDidMount() {
    const { childrenId } = this.props.match.params;
    this.props.getChildren(childrenId);
  }

  editChildren = () => {
    this.setState({
      isEdit: true,
    });
  }

  submitChange = (children: IChildren) => {
    this.props.changeChildren(children);
  }

  render() {
    const { errorInner, cleanErrorInner, pending, children } = this.props;
    const { isEdit } = this.state;

    return (
      <ChildrenWrapper>
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
          {
            isEdit
            ? <EditChildrenCard children={children} submitChange={this.submitChange} />
            : (
              <React.Fragment>
                <Button onClick={this.editChildren}>
                  Редактировать
                </Button>
                <ChildrenCard children={children} />
              </React.Fragment>
            )
          }
        </Spin>
      </ChildrenWrapper>
    );
  }
}
