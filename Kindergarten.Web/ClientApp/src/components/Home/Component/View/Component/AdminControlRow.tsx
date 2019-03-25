import * as React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Button from "@core/antd/Button";

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
  DeletePost,
}: {
  postId: number,
  history: History<any>,
  DeletePost: (postId: number) => void,
}) => (
    <Col xs={24} sm={{ span: 2 }}>
      <Button
        key="delete"
        className="delete-button"
        onClick={() => {
          DeletePost(postId);
          history.push("/");
        }}
      >
        Удалить публикацию
      </Button>
    </Col>
  );

const AdminControlRow = ({
  postId,
  history,
  DeletePost,
}: {
  postId: number,
  history: History<any>,
  DeletePost: (postId: number) => void,
}) => (
    <Row className="control-row">
      <Edit
        postId={postId}
        history={history}
      />
      <Delete
        postId={postId}
        history={history}
        DeletePost={DeletePost}
      />
    </Row>
  );

export default AdminControlRow;
