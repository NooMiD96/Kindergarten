import * as React from "react";
import { NavLink } from "react-router-dom";

import Alert from "@src/core/components/Alert";
import { Spin, Input, List, Icon, Divider, Button, Row, Col } from "@core/antd";

import { TState, TComponentState } from "@components/Search/TSearch";
import { IChildren } from "@components/Children/State";

export class Search extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    showSearchChildren: true,
  };

  searchChildrens = (e: any) => {
    let searchString = "";
    if (e) {
      searchString = e.target.value ? e.target.value.trim() : "";
    } else {
      const reactInput = this.refs.input as any;
      if (reactInput.input) {
        searchString = reactInput.input.value ? reactInput.input.value.trim() : "";
      }
    }

    if (searchString) {
      this.props.searchChildrenList(searchString);
      this.setState({
        showSearchChildren: true,
      });
    }
  }

  searchChildrenWithoutVaccination = () => {
    this.props.getChildrenWithoutVaccination();
    this.setState({
      showSearchChildren: false,
    });
  }

  render() {
    const { errorInner, cleanErrorInner, pending, childrenList } = this.props;
    const { showSearchChildren } = this.state;
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
          <Row>
            <Col xs={24} sm={12} lg={6}>
              <Input onPressEnter={this.searchChildrens} placeholder="Введите имя и/или фамилию ребёнка" ref="input" />
            </Col>
            <Col xs={24} sm={{span: 1, offset: 1}}>
            {
              showSearchChildren
              ? (
                <Button onClick={this.searchChildrenWithoutVaccination}>Показать детей без прививок</Button>
              ) : (
                <Button onClick={() => this.searchChildrens(undefined)}>Найти детей</Button>
              )
            }
            </Col>
          </Row>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={childrenList}
            renderItem={(item: IChildren) => (
              <List.Item actions={[navLinkCreator(item.childrenId)]}>
                <List.Item.Meta title={`${item.firstName} ${item.secondName}`}/>
              </List.Item>
            )}
          />
        </Spin>
      </React.Fragment>
    );
  }
}
