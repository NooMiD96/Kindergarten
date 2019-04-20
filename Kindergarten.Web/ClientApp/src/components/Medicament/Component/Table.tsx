import * as React from "react";

import { Table, Button } from "@core/antd";
import { GetTableColumns } from "./TableHelper";

import { IMedicament } from "../State";

export type TProps = {
  addNewMedicament: Function;
  updateChangeMedicamentList: (medicament: IMedicament) => void;
  enableChange: Boolean;
  changeMedicamentList: () => void;
  enableDelete: Boolean;
  deleteMedicamentList: () => void;

  lastCreateIndex: number;
  medicamentList: IMedicament[];
  updateSelectedDeleteList: (selectedRowKeys: any) => void;
};

export type TState = {
  editId: number | null,
  filtered: boolean,
  filterDropdownVisible: boolean,
  searchText: string | null,
  filterData: IMedicament[],
};

export class MedicamentTable extends React.Component<TProps, TState> {
  state: TState = {
    editId: null,
    filtered: false,
    filterDropdownVisible: false,
    searchText: null,
    filterData: [],
  };

  componentDidUpdate(prevProp: TProps) {
    if (prevProp.medicamentList !== this.props.medicamentList && this.state.filtered) {
      this.onSearch();
    }
  }

  onEditClick = (record: IMedicament) => {
    if (record.medicamentId === this.state.editId) {
      this.setState({
        editId: null,
      });
    } else {
      this.props.updateChangeMedicamentList(record);
      this.setState({
        editId: record.medicamentId,
      });
    }
  }

  onPressEnter = (e: any) => {
    this.setState({
      editId: null,
    });
  }

  addNewMedicament = () => {
    this.props.addNewMedicament();
    this.setState({ editId: this.props.lastCreateIndex });
  }

  onSearch = (e?: any) => {
    const searchText = e ? e.target.value : this.state.searchText;
    if (searchText) {
      const reg = new RegExp(searchText, "gi");
      this.setState({
        searchText: e.target.value,
        filterDropdownVisible: false,
        filtered: !!searchText,
        filterData: this.props.medicamentList.filter((record: IMedicament) => !!record.name.match(reg)),
      });
    } else {
      this.setState({
        searchText: null,
      });
    }
  }

  onFilterDropdownVisibleChange = (visible: any) => {
    // this.setState({
    //   filterDropdownVisible: visible,
    // }, () => this.searchInput ? this.searchInput.focus() : "");
  }

  render() {
    const { medicamentList } = this.props;
    const { filtered, filterData } = this.state;

    const columns = GetTableColumns(
      this.state,
      this.onPressEnter,
      this.onSearch,
      this.onFilterDropdownVisibleChange,
      this.onEditClick
    );

    const rowSelection = {
      onChange: this.props.updateSelectedDeleteList,
    };

    return (
      <Table
        dataSource={filtered ? filterData : medicamentList}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record: IMedicament) => record.medicamentId.toString()}
        rowClassName={(record: IMedicament) => {
          let expirationDate = record.expirationDate;
          if (typeof expirationDate === "string") {
            expirationDate = new Date(expirationDate);
          }

          return new Date() > expirationDate
            ? "warning-row"
            : "";
        }}
        title={() =>
          (
            <React.Fragment>
              <Button
                onClick={this.addNewMedicament}
              >
                Добавить
              </Button>
              <Button
                onClick={this.props.changeMedicamentList}
                disabled={!this.props.enableChange}
              >
                Сохранить изменённое
              </Button>
              <Button
                onClick={this.props.deleteMedicamentList}
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

export default MedicamentTable;
