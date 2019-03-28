import * as React from "react";
import { Typography } from "antd";
import Button from "@core/antd/Button";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";

import { ModalTypeEnums } from "../TAccount";

const { Text } = Typography;

type AccountControlButtonsProps = {
  showModal: (ModalType: ModalTypeEnums) => void,
  logout: () => void,
  userName?: string,
};

const AccountControlButtons = (props: AccountControlButtonsProps) => (
  !props.userName
    ? <React.Fragment>
      <Row>
        <Col sm={0} md={24}>
          <Button
            type="primary"
            // shape="circle"
            size="large"
            icon="login"
            onClick={() => props.showModal(ModalTypeEnums.Authentication)}
          >
            <Text>Войти</Text>
          </Button>
          <Button
            type="primary"
            // shape="circle"
            size="large"
            icon="idcard"
            onClick={() => props.showModal(ModalTypeEnums.Registration)}
          >
            <Text>Регистрация</Text>
          </Button>
        </Col>
        <Col sm={24} md={0}>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon="login"
            onClick={() => props.showModal(ModalTypeEnums.Authentication)}
          />
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon="idcard"
            onClick={() => props.showModal(ModalTypeEnums.Registration)}
          />
        </Col>
      </Row>
    </React.Fragment>
    : <Button
      type="primary"
      // shape="circle"
      size="large"
      icon="logout"
      onClick={() => props.logout()}
    >
      <Text>Выйти</Text>
    </Button>
);

export default AccountControlButtons;
