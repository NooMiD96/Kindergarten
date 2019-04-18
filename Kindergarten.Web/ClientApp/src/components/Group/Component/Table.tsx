import * as React from "react";

import { Icon, Table, Button } from "@core/antd";
import { GetTableColumns } from "./TableHelper";

import { IChildren } from "@components/Children/State";

export type TProps = {
  addNewChildrenGroup: Function;
  updateEditList: (medicament: IChildren) => void;
  enableChange: Boolean;
  saveChildrenGroups: () => void;
  enableDelete: Boolean;
  deleteChildrenGroups: () => void;

  lastCreateIndex: number;
  itemList: IChildren[];
  updateDeleteList: (selectedRowKeys: any) => void;
};

export type TState = {
  editId: number | null,
};

class ChildrenGroupsTable extends React.Component<TProps, TState> {
  state: TState = {
    editId: null,
  };

  onEditClick = (record: IChildren) => {
    if (record.childrenId === this.state.editId) {
      this.setState({
        editId: null,
      });
    } else {
      this.props.updateEditList(record);
      this.setState({
        editId: record.childrenId,
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
        rowKey={(record: IChildren) => record.childrenId.toString()}
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
