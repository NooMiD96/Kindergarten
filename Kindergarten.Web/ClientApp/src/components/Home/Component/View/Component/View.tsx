import * as React from "react";

import { Card } from "antd";
import { Layout, Row, Col, Form } from "@core/antd";

import CommentList from "./CommentList";
import AdminControlRow from "./AdminControlRow";

import { TState, TComponentState } from "../TView";
import { UserTypeEnums } from "@core/constants";

import ViewWrapper from "./style/view.style";

export class View extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    checkedList: {},
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id as any);
  }

  componentWillUnmount() {
    this.props.cleanePostData();
  }

  sumbitHandler = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sendComment(values.comment, this.props.post.postId);
        this.props.form.resetFields();
      }
    });
  }

  onChangeChecker = (item: any) => {
    this.setState({
      checkedList: {
        ...this.state.checkedList,
        [item.target.value]: item.target.checked,
      },
    });
  }

  deleteCommentListHandler = () => {
    const { checkedList } = this.state;
    let listToSend = [];
    for (let prop in checkedList) {
      if (checkedList[prop]) {
        listToSend.push(prop);
      }
    }
    this.props.deleteCommentList(this.props.post.postId, listToSend as any);
  }

  public render() {
    const {
      post: {
        postId,
        commentList,
        content,
        imgUrl,
      },
      pending,
      userRole,
      form,
      deletePost,
      history,
    } = this.props;

    return <ViewWrapper>
      <Layout>
        {
          userRole === UserTypeEnums.Admin &&
          <AdminControlRow
            deletePost={deletePost}
            history={history}
            postId={postId}
          />
        }
        <Layout.Header>
          <h1 className="comment-head">{"title"}</h1>
        </Layout.Header>
        <Layout.Content>
          <Row className="post-inner-with-image">
            <Col xs={24} sm={{ span: 20, offset: 2 }}>
              {
                imgUrl && <Card
                  className="card-image"
                  cover={<img alt="logo" src={imgUrl} />}
                />
              }
              {content.split("\n")[0]}
            </Col>
          </Row>
          <Row className="post-inner">
            <Col
              xs={24}
              sm={{ span: 20, offset: 2 }}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {content.substr(content.indexOf("\n") + 1)}
            </Col>
          </Row>
        </Layout.Content>
        <Layout.Footer>
          <CommentList
            pending={pending}
            userRole={userRole}
            commentList={commentList}
            deleteCommentListHandler={this.deleteCommentListHandler}
            onChangeChecker={this.onChangeChecker}
            sumbitHandler={this.sumbitHandler}
            form={form}
          />
        </Layout.Footer>
      </Layout>
    </ViewWrapper>;
  }
}

export const ViewForm = Form.create({})(View);
