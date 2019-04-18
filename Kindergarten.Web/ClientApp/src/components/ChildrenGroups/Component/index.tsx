import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin } from "@core/antd";
import Table from "./Table";

import { TState, TComponentState, SendTypeEnum } from "@components/ChildrenGroups/TChildrenGroups";
import { IGroupState } from "@components/Group/State";

export class ChildrenGroups extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    lastCreateIndex: -1,
    editList: [],
    deleteList: [],
    lastSendedType: SendTypeEnum.Default,
  };

  componentDidMount() {
    this.props.getChildrenGroups();
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

  updateEditList = (group: IGroupState) => {
    const { editList } = this.state;
    // tslint:disable-next-line
    if (editList.findIndex(x => x.groupId == group.groupId) === -1) {
      this.setState({
        editList: [...editList, group],
      });
    }
  }

  saveChildrenGroups = () => {
    this.props.saveChildrenGroups(this.state.editList);
    this.setState({
      lastSendedType: SendTypeEnum.Edit,
    });
  }

  updateDeleteList = (selectedRowsIdList: string[]) => {
    this.setState({ deleteList: selectedRowsIdList });
  }

  deleteChildrenGroups = () => {
    this.props.deleteChildrenGroups(this.state.deleteList);
    this.setState({
      lastSendedType: SendTypeEnum.Delete,
    });
  }

  addNewChildrenGroup = () => {
    const { lastCreateIndex } = this.state;
    const group = { groupId: lastCreateIndex } as IGroupState;

    this.props.addNewChildrenGroup(group);
    this.updateEditList(group);
    this.setState({ lastCreateIndex: this.state.lastCreateIndex - 1 });
  }

  render() {
    const { errorInner, cleanErrorInner, childrenGroupsList, pending, history } = this.props;
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
            saveChildrenGroups={this.saveChildrenGroups}
            enableDelete={!!deleteList.length}
            deleteChildrenGroups={this.deleteChildrenGroups}

            lastCreateIndex={lastCreateIndex}
            itemList={childrenGroupsList}
            updateDeleteList={this.updateDeleteList}
          />
        </Spin>
      </React.Fragment>
    );
  }
}
