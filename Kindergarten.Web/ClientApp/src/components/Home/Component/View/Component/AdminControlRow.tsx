import * as React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Button from "@core/antd/Button";
import { Text } from "@core/antd/Typography";

import { History } from "history";

const Edit = ({
  postId,
  history,
}: {
  postId: number,
  history: History<any>,
}) => (
    <Col xs={24} sm={{ span: 2, offset: 1 }}>
      <Button
        key="edit"
        className="edit-button"
        onClick={() => history.push(`/edit/${postId}`)}
      >
        Редактировать публикацию
      </Button>
    </Col>
  );

const Delete = ({
  postId,
  history,
  deletePost,
}: {
  postId: number,
  history: History<any>,
  deletePost: (postId: number) => void,
}) => (
    <Col xs={24} sm={{ span: 2 }}>
      <Button
        key="delete"
        className="delete-button"
        onClick={() => {
          deletePost(postId);
          history.push("/");
        }}
      >
        <Text>Удалить публикацию</Text>
      </Button>
    </Col>
  );

const AdminControlRow = ({
  postId,
  history,
  deletePost,
}: {
  postId: number,
  history: History<any>,
  deletePost: (postId: number) => void,
}) => (
    <Row className="control-row">
      <Edit
        postId={postId}
        history={history}
      />
      <Delete
        postId={postId}
        history={history}
        deletePost={deletePost}
      />
    </Row>
  );

export default AdminControlRow;
