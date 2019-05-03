import * as React from "react";

import { DatePicker, Input, Button, Icon } from "@core/antd";

import * as moment from "moment";
import { TProps, TState } from "./Table";
import { IMedicament } from "../State";

const emptyRequireField = () => (
  <span style={{color: "#b60606d6"}}>Поле обязательное для заполнения</span>
);

const filterIcon = (filtered: Boolean) => (
  <Icon
    type="filter"
    style={{ color: filtered ? "#108ee9" : "#aaa" }}
  />
);

const filterDropdown = (
  // searchInput: any,
  searchText: string | null,
  onSearch: (e?: any) => void
) => (
  <div className="custom-filter-dropdown">
    <Input
      // ref={ele => searchInput = ele}
      placeholder="Поиск по названию"
      defaultValue={searchText || ""}
      // onChange={this.onInputChange}
      onPressEnter={onSearch}
    />
    <Button
      type="primary"
      onClick={onSearch}
    >
      Поиск
    </Button>
  </div>
);

const fullWidthStyle = {
  width: "100%",
};

const intParser = (e: any) => {
  const val = Number.parseInt(e.target.value, 10);

  return Number.isNaN(val) ? 0 : val;
};

const GetTableColumns = (
  state: TState,
  onPressEnter: (e: any) => void,
  onSearch: (e: any) => void,
  onFilterDropdownVisibleChange: (e: any) => void,
  onEditClick: (e: any) => void
) => {
  const { filtered, searchText, filterDropdownVisible } = state;

  return [{
    title: "Наименование",
    dataIndex: "name",
    render: (value: string, record: IMedicament) => (
      record.medicamentId === state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value}
          onChange={(e) => record.name = e.target.value}
          onPressEnter={onPressEnter}
        />
        : (!!value ? value : emptyRequireField())
    ),
    filterDropdown: filterDropdown(searchText, onSearch),
    filterIcon: filterIcon(filtered),
    filterDropdownVisible: filterDropdownVisible,
    onFilterDropdownVisibleChange: onFilterDropdownVisibleChange,
  }, {
    title: "Количество",
    dataIndex: "count",
    render: (value: number, record: IMedicament) => (
      record.medicamentId === state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value && value.toString() || ""}
          type="number"
          onChange={(e) => record.count = intParser(e)}
          onPressEnter={onPressEnter}
        />
        : (!!value ? value : emptyRequireField())
      ),
  }, {
    title: "Дата",
    dataIndex: "expirationDate",
    render: (value: Date, record: IMedicament) => {
      if (!record.expirationDate) {
        record.expirationDate = moment().toDate();
      }

      return (
        record.medicamentId === state.editId
          ? <DatePicker
            style={fullWidthStyle}
            // popupStyle={fullWidthStyle}
            onChange={(moment: any) => record.expirationDate = moment.toDate()}
            defaultValue={moment(value)}
          />
          : (!!value ? value.toLocaleDateString() : emptyRequireField())
      );
    },
  }, {
    title: "Пометка",
    dataIndex: "comment",
    render: (value: any, record: IMedicament) => (
      record.medicamentId === state.editId
        ? <Input
          data-id={record.medicamentId}
          defaultValue={value}
          onChange={(e) => record.comment = e.target.value}
          onPressEnter={onPressEnter}
        />
        : value
      ),
  }, {
    title: "Действие",
    width: "12%",
    render: (_text: any, record: IMedicament) => (
      <span>
        <Button onClick={() => onEditClick(record)}>Изменить/Принять</Button>
      </span>
    ),
  }];
};

export {
  GetTableColumns,
};
