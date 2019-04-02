import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Table, Input, Button, Spin, Icon } from "@core/antd";

import { IMedicament } from "../State";

import { TState, TComponentState, SendTypeEnum } from "@components/Medicament/TMedicament";

export class Medicament extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    editId: null,
    inputValue: "",
    lastCreateIndex: -1,
    editList: [],
    deleteList: [],
    lastSendedType: SendTypeEnum.Default,
    filterData: [],
    searchText: "",
    filtered: false,
    filterDropdownVisible: false,
  };

  searchInput: any;

  componentDidMount() {
    this.props.getMedicamentList();
  }

  componentDidUpdate(prevProp: TState) {
    const { pending, errorInner, medicamentList } = this.props;
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
    if (prevProp.medicamentList !== medicamentList && this.state.filtered) {
      this.onSearch();
    }
  }

  onEditClick = (record: any) => {
    if (record.medicamentId === this.state.editId) {
      const { editId, inputValue } = this.state;
      this.addToEditList(editId, inputValue);
    } else {
      this.setState({
        editId: record.medicamentId,
      });
    }
  }

  onPressEnter = (e: any) => {
    this.addToEditList(
      Number.parseInt(e.target.getAttribute("data-id"), 10),
      e.target.value
    );
  }

  addToEditList = (id: number | null, value?: string) => {
    this.setState({
      editId: null,
      inputValue: "",
    });

    if (typeof (id) !== "number" || isNaN(id)) {
      return;
    }

    const { editList } = this.state;
    const lastCreateIndex = this.state.lastCreateIndex + 1;

    // if new symptom is empty delete his
    if (!value && id === lastCreateIndex) {
      /**
       * Probably this block doesn't need
       * 'cause element isn't already added in 'EditList'
       */
      // const index = EditList.indexOf({medicamentId: id, name: ''});
      // this.setState({
      //     EditList: EditList.slice(0, index).concat(EditList.slice(index + 1))
      // });

      this.props.deleteMedicament(id);
      return;
    } else if (!value) {
      return;
    }

    const findIndexPredicate = (value: IMedicament) => value.medicamentId === id;
    const indexOfElemInEditList = editList.findIndex(findIndexPredicate);

    if (indexOfElemInEditList !== -1) {
      editList.splice(indexOfElemInEditList, 1);
    }

    const newMedicament = {
      medicamentId: id,
      name: value,
    } as IMedicament;

    editList.push(newMedicament);

    // set new value to render
    this.props.setNewValue(newMedicament);
  }

  onAddMedicament = () => {
    const lastCreateIndex = this.state.lastCreateIndex;

    this.props.addNewMedicament({ medicamentId: lastCreateIndex } as IMedicament);

    this.setState({
      editId: lastCreateIndex,
      lastCreateIndex: lastCreateIndex - 1,
    });
  }

  onChangeCell = (e: any) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  changeMedicamentList = () => {
    this.props.changeMedicamentList(this.state.editList);
    this.setState({
      lastSendedType: SendTypeEnum.Edit,
    });
  }

  deleteMedicamentList = () => {
    this.props.deleteMedicamentList(this.state.deleteList);
    this.setState({
      lastSendedType: SendTypeEnum.Delete,
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
    const { errorInner, cleanErrorInner, medicamentList, pending } = this.props;
    const { filterData, editList, deleteList, filtered, filterDropdownVisible, searchText } = this.state;

    const columns = [{
      title: "Наименование",
      dataIndex: "name",
      render: (text: any, record: IMedicament) => record.medicamentId === this.state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={text}
          onChange={this.onChangeCell}
          onPressEnter={this.onPressEnter}
        />
        : text,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: (
        <Icon
          type="filter"
          style={{ color: filtered ? "#108ee9" : "#aaa" }}
        />
      ),
      filterDropdownVisible: filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible: any) => this.setState({
        filterDropdownVisible: visible,
      }, () => this.searchInput ? this.searchInput.focus() : ""),
    }, {
      title: "\0",
      width: "12%",
      render: (_text: any, record: IMedicament) => (
        <span>
          <Button onClick={() => this.onEditClick(record)}>Изменить/Принять</Button>
        </span>
      ),
    }];

    const rowSelection = {
      onChange: (selectedRowKeys: any) => this.setState({ deleteList: selectedRowKeys }),
    };

    return (
      <React.Fragment>
        {/* <AlertModule
          errorInner={errorInner}
          cleanErrorInner={cleanErrorInner}
      /> */}
        {
          errorInner && <Alert
          message="Error"
          description={errorInner}
          type="error"
          closable
          style={{ marginBottom: 10 }}
          onClose={CleanErrorInner}
        />
        }
        <Spin
          spinning={pending}
        >
          <Table
            dataSource={filtered ? filterData : medicamentList}
            columns={columns}
            rowSelection={rowSelection}
            rowKey={(record: IMedicament) => record.medicamentId.toString()}
            title={() => <div>
              <Button
                onClick={this.onAddMedicament}
              >
                Добавить
              </Button>
              <Button
                onClick={this.changeMedicamentList}
                disabled={!editList.length}
              >
                Сохранить изменённое
              </Button>
              <Button
                onClick={this.deleteMedicamentList}
                disabled={!deleteList.length}
              >
                Удалить выбранные
              </Button>
            </div>
            }
          />
        </Spin>
      </React.Fragment>
    );
  }
}
