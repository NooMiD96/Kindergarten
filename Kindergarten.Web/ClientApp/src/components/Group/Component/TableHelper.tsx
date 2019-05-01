import * as React from "react";
import { NavLink } from "react-router-dom";

import { Input, Button, Icon, Typography } from "@core/antd";

import { IChildren } from "@components/Children/State";
const { Text } = Typography;

const emptyRequireField = () => (
  <span style={{ color: "#b60606d6" }}>Поле обязательное для заполнения</span>
);

const GetTableColumns = (
  editId: number | null,
  onPressEnter: (e: any) => void,
  onEditClick: (e: any) => void
) => [{
  title: "Фамилия",
  dataIndex: "secondName",
  render: (value: string, record: IChildren) => (
    record.childrenId === editId
      ? <Input
        data-id={record.childrenId}
        defaultValue={value}
        onChange={(e) => {
          if (e.target.value.match("^[a-zA-Zа-яА-ЯёЁ]*$")) {
            record.secondName = e.target.value;
          }
        }}
        onPressEnter={onPressEnter}
      />
      : (!!value ? value : emptyRequireField())
  ),
}, {
  title: "Имя",
  dataIndex: "firstName",
  render: (value: string, record: IChildren) => (
    record.childrenId === editId
      ? <Input
        data-id={record.childrenId}
        defaultValue={value}
        onChange={(e) => {
          if (e.target.value.match("^[a-zA-Zа-яА-ЯёЁ]*$")) {
            record.firstName = e.target.value;
          }
        }}
        onPressEnter={onPressEnter}
      />
      : (!!value ? value : emptyRequireField())
  ),
}, {
  title: "Действие",
  key: "action",
  width: "20%",
  render: (_: any, record: IChildren) => (
    <React.Fragment>
      <Button
        onClick={() => onEditClick(record)}
        className="float-left"
      >
        {
          record.childrenId === editId
            ? "Принять"
            : "Изменить"
        }
      </Button>
      {
        record.childrenId > 0
          ? (
            <NavLink
              to={`/children/${record.childrenId}`}
              className="float-right"
            >
              Перейти <Icon type="arrow-right" />
            </NavLink>
          )
          : (
            <Text className="float-right">
              Сохраните, чтобы перейти
            </Text>
          )
      }

    </React.Fragment>
  ),
}];

export {
  GetTableColumns,
};
