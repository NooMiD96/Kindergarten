import * as React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, List, Icon, Typography } from "@core/antd";

import { IPost } from "@components/Home/State";

const { Text } = Typography;

const avatarRendererFunc = (author: string) => (
  <Avatar
    className="home-publish-vertical-avatar"
    size={52}
  >
    {author}
  </Avatar>
);

const titleRendererFunc = (postId: number, header: string) => (
  <NavLink to={`/post/${postId}`}>
    {header}
  </NavLink>
);

const descriptionRendererFunc = (author: string, date: Date) => (
  <Text>Был создан {author} в {date.toLocaleString()}</Text>
);

const PublishRenderer = (item: IPost) =>
(
  <List.Item
    key={item.postId}
    actions={[
      <React.Fragment>
        <Icon
          type="message"
          className="home-publish-list-message_icon"
        />
        {item.commentCount}
      </React.Fragment>,
    ]}
    extra={item.imgUrl && <img width={200} alt="logo" src={item.imgUrl} />}
  >
    <List.Item.Meta
      avatar={avatarRendererFunc(item.author)}
      title={titleRendererFunc(item.postId, item.header)}
      description={descriptionRendererFunc(item.author, item.date)}
    />
  </List.Item>
);

export default PublishRenderer;
