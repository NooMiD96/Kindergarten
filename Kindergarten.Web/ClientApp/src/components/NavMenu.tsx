import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RouterState } from "connected-react-router";
import { Title } from "@core/antd/Typography";
import Menu from "@core/antd/Menu";
import Icon from "@core/antd/Icon";

import { ApplicationState } from "@src/Store";
import { UserTypeEnums } from "@core/constants";
import { AccountState } from "@components/Account/IAccountState";
import { IMouseClickEvent } from "@core/IEvents";

import Account from "@components/Account";
import { routesArray, routesObject } from "@core/constants";

interface IComponentState {
  selectedKeys: string[];
  collapsed: boolean;
}

interface IComponentProps extends AccountState, RouterState { }

export class NavMenu extends React.Component<IComponentProps, IComponentState> {
  state: IComponentState = {
    selectedKeys: [],
    collapsed: false,
  };

  componentDidMount() {
    this.setState({
      selectedKeys: [this.getUrlKey()],
    });
  }

  componentDidUpdate(prevProps: IComponentProps) {
    if (prevProps.location !== this.props.location) {
      const urlKey = this.getUrlKey();
      if (this.state.selectedKeys[0] !== urlKey) {
        this.setState({
          selectedKeys: [urlKey],
        });
      }
    }
  }

  getUrlKey() {
    const url = this.props.location.pathname;
    return routesArray[(routesObject as any)[url] || 0];
  }

  onSelectItemHandler = (event: { item: {}, key: string, selectedKeys: string[] }) => {
    if (!this.state.selectedKeys.includes(event.key)) {
      this.setState({
        selectedKeys: [event.key],
      });
    }
  }

  preventClick = (e: IMouseClickEvent, to: string) => {
    if (this.props.location.pathname === to) {
      e.preventDefault();
    }
  }

  render() {
    const { userType } = this.props;

    const NavLinks = [
      <Menu.Item key={routesArray[0]}>
        <Link
          to={routesArray[0]}
          onClick={e => this.preventClick(e, routesArray[0])}
        >
          Новости
        </Link>
      </Menu.Item>,
    ];

    if (userType === UserTypeEnums.Admin || userType === UserTypeEnums.Employee) {
      NavLinks.push(
        <Menu.Item key={routesArray[1]}>
          <Link
            to={routesArray[1]}
            onClick={e => this.preventClick(e, routesArray[1])}
          >
            Visitation
          </Link>
        </Menu.Item>
        // <Menu.Item key={routesArray[2]}>
        //   <Link
        //     to={routesArray[2]}
        //     onClick={e => this.preventClick(e, routesArray[1])}
        //   >
        //     Symptom List
        //   </Link>
        // </Menu.Item>
      );
    }

    NavLinks.push(
      // <Menu.Item key="3">
      //   <Link to={"/SearchDisease"}>Search Disease</Link>
      // </Menu.Item>,
      <Menu.Item key={routesArray[2]}>
        <Link
          to={routesArray[2]}
          onClick={e => this.preventClick(e, routesArray[2])}
        >
          Чат
        </Link>
      </Menu.Item>
    );

    return (
      <div className="header-container">
        <div className="header-menu-container">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={this.state.selectedKeys}
            onSelect={this.onSelectItemHandler}
          >
            <Menu.SubMenu
              title={(
              <React.Fragment>
                <Icon
                  type="caret-dow"
                  className="header-submenu-more-icon"
                />
                  <Title
                    className="main-title"
                    level={2}
                  >
                    Kindergarten
                  </Title>
                </React.Fragment>
              )}
            >
              {NavLinks}
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className="header-account-container">
          <Account />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState): IComponentProps => ({
    ...state.account,
    ...state.router,
  })
)(NavMenu);
