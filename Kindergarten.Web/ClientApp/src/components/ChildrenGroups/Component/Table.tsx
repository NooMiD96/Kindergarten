import * as React from "react";

import { Icon, Table, Button } from "@core/antd";
import { GetTableColumns } from "./TableHelper";

import { IGroupState } from "@components/Group/State";

export type TProps = {
  addNewChildrenGroup: Function;
  updateEditList: (medicament: IGroupState) => void;
  enableChange: Boolean;
  saveChildrenGroups: () => void;
  enableDelete: Boolean;
  deleteChildrenGroups: () => void;

  lastCreateIndex: number;
  itemList: IGroupState[];
  updateDeleteList: (selectedRowKeys: any) => void;
};

export type TState = {
  editId: number | null,
};

class ChildrenGroupsTable extends React.Component<TProps, TState> {
  state: TState = {
    editId: null,
  };

  onEditClick = (record: IGroupState) => {
    if (record.groupId === this.state.editId) {
      this.setState({
        editId: null,
      });
    } else {
      this.props.updateEditList(record);
      this.setState({
        editId: record.groupId,
      });
    }
  }

  onPressEnter = (e: any) => {
    this.setState({
      editId: null,
    });
  }

  addNewMedicament = () => {
    this.props.addNewChildrenGroup();
    this.setState({ editId: this.props.lastCreateIndex });
  }

  render() {
    const { itemList } = this.props;

    const columns = GetTableColumns(
      this.state.editId,
      this.onPressEnter,
      this.onEditClick
    );

    const rowSelection = {
      onChange: this.props.updateDeleteList,
    };

    return (
      <Table
        dataSource={itemList}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record: IGroupState) => record.groupId.toString()}
        title={() =>
          (
            <React.Fragment>
              <Button
                onClick={this.addNewMedicament}
              >
                Добавить
              </Button>
              <Button
                onClick={this.props.saveChildrenGroups}
                disabled={!this.props.enableChange}
              >
                Сохранить изменённое
              </Button>
              <Button
                onClick={this.props.deleteChildrenGroups}
                disabled={!this.props.enableDelete}
              >
                Удалить выбранные
              </Button>
            </React.Fragment>
          )
        }
      />
    );
  }
}

export default ChildrenGroupsTable;
