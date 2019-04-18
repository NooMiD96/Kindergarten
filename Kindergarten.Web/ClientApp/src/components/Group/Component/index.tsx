import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin } from "@core/antd";
import Table from "./Table";

import { TState, TComponentState, SendTypeEnum } from "@components/Group/TGroup";
import { IChildren } from "@components/Children/State";

export class Group extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    lastCreateIndex: -1,
    editList: [],
    deleteList: [],
    lastSendedType: SendTypeEnum.Default,
  };

  componentDidMount() {
    const { groupId } = this.props.match.params;
    this.props.getChildrenList(groupId);
  }

  componentDidUpdate(prevProp: TState) {
    const { pending, errorInner } = this.props;

    if (prevProp.pending && !pending && !errorInner) {
      const { lastSendedType } = this.state;

      if (lastSendedType === SendTypeEnum.Edit) {
        this.setState({
          editList: [],
          lastSendedType: SendTypeEnum.Default,
        });
      } else if (lastSendedType === SendTypeEnum.Delete) {
        this.setState({
          deleteList: [],
          lastSendedType: SendTypeEnum.Default,
        });
      } else {
        this.setState({
          lastSendedType: SendTypeEnum.Default,
        });
      }
    }
  }

  updateEditList = (group: IChildren) => {
    const { editList } = this.state;
    // tslint:disable-next-line
    if (editList.findIndex(x => x.childrenId == group.childrenId) === -1) {
      this.setState({
        editList: [...editList, group],
      });
    }
  }

  saveChildrenList = () => {
    const { groupId } = this.props.match.params;
    this.props.saveChildrenList(groupId, this.state.editList);
    this.setState({
      lastSendedType: SendTypeEnum.Edit,
    });
  }

  updateDeleteList = (selectedRowsIdList: string[]) => {
    this.setState({ deleteList: selectedRowsIdList });
  }

  deleteChildrenList = () => {
    const { groupId } = this.props.match.params;
    this.props.deleteChildrenList(groupId, this.state.deleteList);
    this.setState({
      lastSendedType: SendTypeEnum.Delete,
    });
  }

  addNewChildrenGroup = () => {
    const { lastCreateIndex } = this.state;
    const children = { childrenId: lastCreateIndex } as IChildren;

    this.props.addNewChildren(children);
    this.updateEditList(children);
    this.setState({ lastCreateIndex: this.state.lastCreateIndex - 1 });
  }

  render() {
    const { errorInner, cleanErrorInner, childrenList, pending, history } = this.props;
    const { editList, deleteList, lastCreateIndex } = this.state;

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
          <Table
            addNewChildrenGroup={this.addNewChildrenGroup}
            updateEditList={this.updateEditList}
            enableChange={!!editList.length}
            saveChildrenGroups={this.saveChildrenList}
            enableDelete={!!deleteList.length}
            deleteChildrenGroups={this.deleteChildrenList}

            lastCreateIndex={lastCreateIndex}
            itemList={childrenList}
            updateDeleteList={this.updateDeleteList}
          />
        </Spin>
      </React.Fragment>
    );
  }
}
