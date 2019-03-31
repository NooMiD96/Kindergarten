import * as React from "react";

import { Card } from "antd";
import { Layout, Row, Col, Form, Divider, Typography } from "@core/antd";

import CommentList from "./CommentList";
import AdminControlRow from "./AdminControlRow";

import { TState, TComponentState } from "../TView";
import { UserTypeEnums } from "@core/constants";

import ViewWrapper from "./style/view.style";

const { Title, Text } = Typography;

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

  splitContent = (content: string): ({firstParagraph: string, remainingParagraphList: string[]}) => {
    const paragraphList = content.split("\n");

    return {
      firstParagraph: paragraphList.shift()!,
      remainingParagraphList: paragraphList,
    };
  }

  render() {
    const {
      post: {
        postId,
        commentList,
        header,
        content,
        imgUrl,
      },
      pending,
      userRole,
      form,
      deletePost,
      history,
    } = this.props;

    const { firstParagraph, remainingParagraphList } = this.splitContent(content);

    return (
      <ViewWrapper>
        <Layout>
          {
            userRole === UserTypeEnums.Admin &&
            <React.Fragment>
              <AdminControlRow
                deletePost={deletePost}
                history={history}
                postId={postId}
              />
              <Divider />
            </React.Fragment>
          }
          <Layout.Header>
            <Title>{header}</Title>
          </Layout.Header>
          <Layout.Content>
            <Row className="post-inner-with-image">
              <Col xs={24} sm={{ span: 22, offset: 1 }}>
                {
                  imgUrl && <Card
                    className="card-image"
                    cover={<img alt="logo" className="card-image-img" src={imgUrl} />}
                  />
                }
                <Text>{firstParagraph}</Text>
              </Col>
            </Row>
            <Row className="post-inner">
            {
              remainingParagraphList.map((x, index) => (
                <Col
                  key={`paragraph-${index}`}
                  xs={24}
                  sm={{ span: 22, offset: 1 }}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <Text>{x}</Text>
                </Col>
              ))
            }
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
      </ViewWrapper>
    );
  }
}

export const ViewForm = Form.create({})(View);
