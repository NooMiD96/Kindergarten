import * as React from "react";
import { NavLink } from "react-router-dom";

import { Input, Button, Icon, Typography } from "@core/antd";

import { IGroupState } from "@components/Group/State";
const { Text } = Typography;

const emptyRequireField = () => (
  <span style={{ color: "#b60606d6" }}>Поле обязательное для заполнения</span>
);

const GetTableColumns = (
  editId: number | null,
  onPressEnter: (e: any) => void,
  onEditClick: (e: any) => void
) => [{
  title: "Наименование",
  dataIndex: "groupName",
  render: (value: string, record: IGroupState) => (
    record.groupId === editId
      ? <Input
        data-id={record.groupId}
        defaultValue={value}
        onChange={(e) => record.groupName = e.target.value}
        onPressEnter={onPressEnter}
      />
      : (!!value ? value : emptyRequireField())
  ),
}, {
  title: "Действие",
  key: "action",
  width: "20%",
  render: (_: any, record: IGroupState) => (
    <React.Fragment>
      <Button
        onClick={() => onEditClick(record)}
        className="float-left"
      >
        {
          record.groupId === editId
            ? "Принять"
            : "Изменить"
        }
      </Button>
      {
        record.groupId > 0
          ? (
            <NavLink
              to={`/group?group=${record.groupId}`}
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
