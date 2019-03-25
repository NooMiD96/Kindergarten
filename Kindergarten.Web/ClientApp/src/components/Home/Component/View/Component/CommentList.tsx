import * as React from "react";
import { List, Avatar, Checkbox } from "antd";
import { WrappedFormUtils, hasErrors } from "@core/antd/Form";

import Form from "@core/antd/Form";
import Button from "@core/antd/Button";
import Input from "@core/antd/Input";
import Icon from "@core/antd/Svg";

import { IComment } from "@components/Home/State";
import { UserTypeEnums } from "@core/constants";

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
      Отправить
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
      type="primary"
      loading={pending}
      onClick={deleteCommentListHandler}
    >
      Удалить выделенные
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
            placeholder="Enter your comment"
            prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
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
            style={{ verticalAlign: "middle" }}
            size="large"
          >
            {item.userName}
          </Avatar>
        )}
        title={<p>{item.userName}</p>}
        description={item.date.toLocaleString()}
      />
      <div className="comment-inner">{item.commentInner}</div>
    </List.Item>
  );

  const UserCommentListRender = (item: IComment) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar style={{ verticalAlign: "middle" }} size="large">{item.userName}</Avatar>}
        title={<p>{item.userName}</p>}
        description={item.date.toLocaleString()}
      />
      <div className="comment-inner">{item.commentInner}</div>
    </List.Item>
  );

  const footer = [
    <CommentInput
      pending={pending}
      sumbitHandler={sumbitHandler}
      form={form}
    />,
  ];
  let renderItem;

  if (userRole === UserTypeEnums.Admin) {
    footer.push(
      <DeleteCheckedCommentList
        pending={pending}
        deleteCommentListHandler={deleteCommentListHandler}
      />
    );

    renderItem = AdminCommentListRender;
  } else {
    renderItem = UserCommentListRender;
  }

  return (
    <List
      className="comment-list"
      itemLayout="horizontal"
      loading={pending}
      footer={footer}
      dataSource={commentList}
      renderItem={renderItem}
    />
  );
};

export default CommentList;
