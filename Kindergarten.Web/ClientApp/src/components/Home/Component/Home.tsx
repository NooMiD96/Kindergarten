import * as React from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "antd";
import List from "@core/antd/List";
import Icon from "@core/antd/Icon";
import Button from "@core/antd/Button";

import HomeWrapped from "./style/Home.style";

import { Post } from "../State";
import { TState, TComponentState } from "../THome";
import { UserTypeEnums } from "@core/constants";

export class Home extends React.Component<TState, TComponentState> {
  componentDidMount() {
    this.props.GetPosts(1, 5);
  }

  PageChangeHandler = (page: any, pageSize: any) => {
    this.props.GetPosts(page, pageSize);
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
          Create new record
        </Button>
      }
      <h1>Новости!</h1>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{ defaultCurrent: 1, defaultPageSize: 5, total: totalCount, onChange: this.PageChangeHandler }}
        dataSource={postList}
        // locale={{ emptyText: '' }}
        renderItem={(item: Post) => (
          <List.Item
            key={item.postId}
            actions={[
              <span>
                <Icon type="message" style={{ marginRight: 8 }} />
                {item.commentCount}
              </span>,
            ]}
            extra={item.imgUrl && <img width={200} alt="logo" src={item.imgUrl} />}
          >
            <List.Item.Meta
              avatar={<Avatar style={{ verticalAlign: "middle" }} size="large" >{item.author}</Avatar>}
              title={<NavLink to={`/post/${item.postId}`}>{item.header}</NavLink>}
              description={<div>Created by: {item.author} at {item.date.toLocaleString()}</div>}
            />
          </List.Item>
        )}
      />
    </HomeWrapped>;
  }
}
