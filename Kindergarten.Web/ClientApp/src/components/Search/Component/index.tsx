import * as React from "react";
import { NavLink } from "react-router-dom";

import Alert from "@src/core/components/Alert";
import { Spin, Input, List, Icon } from "@core/antd";

import { TState, TComponentState } from "@components/Search/TSearch";
import { IChildren } from "@components/Children/State";

export class Medicament extends React.Component<TState, TComponentState> {
  state: TComponentState = {};

  searchChildrens = (e: any) => {
    const searchString = e.target.value ? e.target.value.trim() : "";

    if (searchString) {
      this.props.searchChildrenList(searchString);
    }
  }

  render() {
    const { errorInner, cleanErrorInner, pending, childrenList } = this.props;

    const navLinkCreator = (id: number) => (
      <NavLink
        to={`/children/${id}`}
        className="float-right"
      >
        Перейти <Icon type="arrow-right" />
      </NavLink>
    );

    return (
      <React.Fragment>
        {
          errorInner && <Alert
            message="Error"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        }
        <Spin
          spinning={pending}
        >
          <Input onPressEnter={this.searchChildrens} />
          <List
            itemLayout="horizontal"
            dataSource={childrenList}
            renderItem={(item: IChildren) => (
              <List.Item actions={[navLinkCreator(item.childrenId)]}>
                <List.Item.Meta title={`${item.firstName} ${item.secondName}`}/>
              </List.Item>
            )}
          />
          {/* button to show all children without vaccination */}
        </Spin>
      </React.Fragment>
    );
  }
}
