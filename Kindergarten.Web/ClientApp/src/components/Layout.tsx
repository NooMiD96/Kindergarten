import * as React from "react";
import AntdLayout from "@core/antd/Layout";
const { Header, Content, Footer } = AntdLayout;
import { ConfigProvider, Empty } from "antd";
import { Text } from "@core/antd/Typography";

import AccountControlComponent from "@core/HOC/AccountControlComponent";
import NavMenu from "./NavMenu";

const customizeRenderEmpty = () => (
  <Empty
    description={<Text>Данных нет</Text>}
  />
);

export class Layout extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <AntdLayout>
          <Header className="antd-header">
            <NavMenu />
          </Header>
          <Content>
            <AccountControlComponent>
              <ConfigProvider renderEmpty={customizeRenderEmpty}>
                {this.props.children}
              </ConfigProvider>
            </AccountControlComponent>
          </Content>
          <Footer>
            Footer
          </Footer>
        </AntdLayout>
        <div
          id="global-modals-container"
        />
      </React.Fragment>
    );
  }
}
