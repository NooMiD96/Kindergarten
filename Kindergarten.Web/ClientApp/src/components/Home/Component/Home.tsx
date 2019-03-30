import * as React from "react";
import { List, Button, Typography } from "@core/antd";

import PublishRenderer from "./PublishRenderer";
import HomeWrapped from "./style/Home.style";

import { TState, TComponentState } from "../THome";
import { UserTypeEnums } from "@core/constants";

const { Title, Text } = Typography;

export class Home extends React.Component<TState, TComponentState> {
  componentDidMount() {
    this.props.getPosts(1, 5);
  }

  PageChangeHandler = (page: any, pageSize: any) => {
    this.props.getPosts(page, pageSize);
  }

  render() {
    const {
      userRole,
      history,
      totalCount,
      postList,
    } = this.props;

    return <HomeWrapped>
      {
        userRole === UserTypeEnums.Admin &&
        <Button
          className="edit-button"
          onClick={() => history.push("/edit/0")}
        >
          <Text>Создать публикацию</Text>
        </Button>
      }
      <Title>Новости!</Title>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          total: totalCount,
          onChange: this.PageChangeHandler,
        }}
        dataSource={postList}
        renderItem={PublishRenderer}
      />
    </HomeWrapped>;
  }
}
