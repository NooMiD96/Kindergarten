import * as React from "react";

import { Table, Input, Button, Icon } from "@core/antd";

import { IMedicament } from "../State";

type TProps = {
  addNewMedicament: Function;
  enableChange: Boolean;
  changeMedicamentList: () => void;
  enableDelete: Boolean;
  deleteMedicamentList: () => void;

  lastCreateIndex: number;
  medicamentList: IMedicament[];
  addToEditList: Function;
  updateSelectedDeleteList: (selectedRowKeys: any) => void;
};

type TState = {
  editId: number | null,
  inputValue: string,
  filtered: boolean,
  filterDropdownVisible: boolean,
  searchText: string,
  filterData: IMedicament[],
};

export class MedicamentTable extends React.Component<TProps, TState> {
  state: TState = {
    editId: null,
    inputValue: "",
    filterData: [],
    searchText: "",
    filtered: false,
    filterDropdownVisible: false,
  };
  searchInput: any;

  componentDidUpdate(prevProp: TProps) {
    if (prevProp.medicamentList !== this.props.medicamentList && this.state.filtered) {
      this.onSearch();
    }
  }

  onEditClick = (record: any) => {
    if (record.medicamentId === this.state.editId) {
      console.log("onEditClick", record);
      
      const { editId, inputValue } = this.state;
      this.props.addToEditList(editId, inputValue);

      this.setState({
        editId: null,
        inputValue: "",
      });
    } else {
      this.setState({
        editId: record.medicamentId,
      });
    }
  }

  onPressEnter = (e: any) => {
    this.setState({
      editId: null,
      inputValue: "",
    });

    this.props.addToEditList(
      Number.parseInt(e.target.getAttribute("data-id"), 10),
      e.target.value
    );
  }

  addNewMedicament = () => {
    this.props.addNewMedicament();
    this.setState({ editId: this.props.lastCreateIndex });
  }

  onChangeCell = (e: any) => {
    this.setState({
      inputValue: e.target.value,
    });
  }
  onInputChange = (e: any) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      filterData: this.props.medicamentList.filter((record: IMedicament) => !!record.name.match(reg)),
    });
  }

  render() {
    const { medicamentList } = this.props;
    const { filtered, filterData, searchText, filterDropdownVisible } = this.state;

    const columns = [{
      title: "Наименование",
      dataIndex: "name",
      render: (value: any, record: IMedicament) => record.medicamentId === this.state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value}
          onChange={this.onChangeCell}
          onPressEnter={this.onPressEnter}
        />
        : value,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button
            type="primary"
            onClick={this.onSearch}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (
        <Icon
          type="filter"
          style={{ color: filtered ? "#108ee9" : "#aaa" }}
        />
      ),
      filterDropdownVisible: filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible: any) => {
        console.log("onFilterDropdownVisibleChange");

        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput ? this.searchInput.focus() : "")
      },
    }, {
      title: "Количество",
      dataIndex: "count",
      render: (value: any, record: IMedicament) => record.medicamentId === this.state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value}
          onChange={this.onChangeCell}
          onPressEnter={this.onPressEnter}
        />
        : value,
    }, {
      title: "Дата",
      dataIndex: "expirationDate",
      render: (value: any, record: IMedicament) => record.medicamentId === this.state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value}
          onChange={this.onChangeCell}
          onPressEnter={this.onPressEnter}
        />
        : value,
    }, {
      title: "Пометка",
      dataIndex: "comment",
      render: (value: any, record: IMedicament) => record.medicamentId === this.state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value}
          onChange={this.onChangeCell}
          onPressEnter={this.onPressEnter}
        />
        : value,
    }, {
      title: "Действие",
      width: "12%",
      render: (_text: any, record: IMedicament) => (
        <span>
          <Button onClick={() => this.onEditClick(record)}>Изменить/Принять</Button>
        </span>
      ),
    }];

    const rowSelection = {
      onChange: this.props.updateSelectedDeleteList,
    };

    return (
      <Table
        dataSource={filtered ? filterData : medicamentList}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record: IMedicament) => record.medicamentId.toString()}
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
