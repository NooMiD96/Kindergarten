import * as React from "react";

import { Checkbox } from "antd";

import {
  Button,
  Input,
  Icon,
  List,
  Avatar,
  Typography,
  Divider,
} from "@core/antd";
import Form, { WrappedFormUtils, hasErrors } from "@core/antd/Form";

import { IComment } from "@components/Home/State";
import { UserTypeEnums } from "@core/constants";

const { Text } = Typography;

const SendButton = ({
  pending,
  sumbitHandler,
  form,
}: {
  pending: boolean,
  sumbitHandler: (e: any) => void,
  form: WrappedFormUtils,
}) => (
    <Button
      type="primary"
      htmlType="submit"
      loading={pending}
      onClick={sumbitHandler}
      disabled={hasErrors(form.getFieldsError())}
    >
      <Text>Отправить</Text>
    </Button>
  );

const DeleteCheckedCommentList = ({
  pending,
  deleteCommentListHandler,
}: {
  pending: boolean,
  deleteCommentListHandler: () => void,
}) => (
    <Button
      type="danger"
      loading={pending}
      onClick={deleteCommentListHandler}
    >
      <Text>Удалить выделенные</Text>
    </Button>
  );

const CommentInput = ({
  pending,
  sumbitHandler,
  form,
}: {
  pending: boolean,
  sumbitHandler: (e: any) => void,
  form: WrappedFormUtils,
}) => (
    <Form
      key="input-comment"
      onSubmit={sumbitHandler}
    >
      <Form.Item
        validateStatus={
          form.isFieldTouched("comment") && form.getFieldError("comment")
            ? "error"
            : undefined
        }
      >
        {form.getFieldDecorator("comment", {
          rules: [
            { required: true, message: "Введите комментарий" },
            { max: 50, message: "Максимальная длинна комментария - 50 символов!" },
          ],
        })(
          <Input
            placeholder="Введите комментарий"
            prefix={(
              <Icon
                type="message"
                className="home-publish-view-add_comment-message_icon"
              />
            )}
            suffix={(
              <SendButton
                pending={pending}
                sumbitHandler={sumbitHandler}
                form={form}
              />
            )}
          />
        )}
      </Form.Item>
    </Form>
  );

const CommentList = ({
  pending,
  userRole,
  commentList,
  deleteCommentListHandler,
  onChangeChecker,
  sumbitHandler,
  form,
}: {
  pending: boolean,
  userRole: UserTypeEnums,
  commentList: IComment[],
  deleteCommentListHandler: () => void,
  onChangeChecker: (item: any) => void,
  sumbitHandler: (e: any) => void,
  form: WrappedFormUtils,
}) => {
  const AdminCommentListRender = (item: IComment) => (
    <List.Item
      key={item.commentId}
      actions={[
        <Checkbox
          value={item.commentId}
          key={item.commentId}
          onChange={onChangeChecker}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={(
          <Avatar
            className="home-publish-vertical-avatar"
            size="large"
          >
            {item.author}
          </Avatar>
        )}
        title={<p>{item.author}</p>}
        description={item.date.toLocaleString()}
      />
      <div className="comment-inner">{item.content}</div>
    </List.Item>
  );

  const UserCommentListRender = (item: IComment) => (
    <List.Item key={item.commentId}>
      <List.Item.Meta
        avatar={(
          <Avatar
            className="home-publish-vertical-avatar"
            size="large"
          >
            {item.author}
          </Avatar>
        )}
        title={<p>{item.author}</p>}
        description={item.date.toLocaleString()}
      />
      <div className="comment-inner">{item.content}</div>
    </List.Item>
  );

  const footer = [
    <CommentInput
      key="footer_CommentInput"
      pending={pending}
      sumbitHandler={sumbitHandler}
      form={form}
    />,
  ];
  let renderItem;

  if (userRole === UserTypeEnums.Admin) {
    footer.push(
      <DeleteCheckedCommentList
        key="footer_DeleteCheckedCommentList"
        pending={pending}
        deleteCommentListHandler={deleteCommentListHandler}
      />
    );

    renderItem = AdminCommentListRender;
  } else {
    renderItem = UserCommentListRender;
  }

  return (
    <React.Fragment>
      <Divider />
      <List
        locale={{emptyText: "Комментарии отсутствуют..."}}
        className="comment-list"
        itemLayout="horizontal"
        loading={pending}
        footer={footer}
        dataSource={commentList}
        renderItem={renderItem}
      />
    </React.Fragment>
  );
};

export default CommentList;
