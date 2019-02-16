import * as React from "react";

import { Card, List, Avatar, Checkbox } from "antd";
import Layout from "@core/antd/Layout";
import Input from "@core/antd/Input";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Form from "@core/antd/Form";
import Button from "@core/antd/Button";
// TODO:
import Icon from "@core/antd/Svg";

import ViewWrapper from "./style/view.style";
import { TState, TComponentState } from "../TView";
import { Comment } from "@components/Home/State";
// TODO:
// import hasErrors from "core/app/components/formErrorHandler";
import { UserTypeEnums } from "@core/constants";

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;

export class View extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    checkedList: {},
  };

  componentDidMount() {
    this.props.GetPost(this.props.match.params.id as any);
  }

  componentWillUnmount() {
    this.props.CleanePostData();
  }

  SumbitHandler = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.SendComment(values.comment, this.props.post.postId);
        this.props.form.resetFields();
      }
    });
  }

  AdminCommentListRender = (item: Comment) => (
    <List.Item
      actions={[<Checkbox value={item.commentId} key={item.commentId} onChange={this.onChangeChecker} />]}
    >
      <List.Item.Meta
        avatar={<Avatar style={{ verticalAlign: "middle" }} size="large">{item.userName}</Avatar>}
        title={<p>{item.userName}</p>}
        description={item.date.toLocaleString()}
      />
      <div className="comment-inner">{item.commentInner}</div>
    </List.Item>
  )

  UserCommentListRender = (item: Comment) => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar style={{ verticalAlign: "middle" }} size="large">{item.userName}</Avatar>}
        title={<p>{item.userName}</p>}
        description={item.date.toLocaleString()}
      />
      <div className="comment-inner">{item.commentInner}</div>
    </List.Item>

  )

  onChangeChecker = (item: any) => {
    this.setState({
      checkedList: {
        ...this.state.checkedList,
        [item.target.value]: item.target.checked,
      },
    });
  }

  deleteCommentsHandler = () => {
    const { checkedList } = this.state;
    let listToSend = [];
    let prop;
    for (prop in checkedList) {
      if (checkedList[prop]) {
        listToSend.push(prop);
      }
    }
    this.props.DeleteCommentsList(this.props.post.postId, listToSend as any);
  }

  public render() {
    const {
      post: {
        postId,
        commentsList,
        context,
        imgUrl,
      },
      pending,
      userName,
      userRole,
    } = this.props;
    // const title = this.props.Header;

    const { isFieldTouched, getFieldError, getFieldDecorator, getFieldsError } = this.props.form;
    const userNameError = isFieldTouched("comment") && getFieldError("comment");

    const sendButton = <Button type="primary"
      htmlType="submit"
      loading={pending}
      onClick={this.SumbitHandler}
    // disabled={hasErrors(getFieldsError())}
    >
      Send
    </Button>;

    const deleteCheckedComments = <Button
      key="delete-comments-button"
      type="primary"
      loading={pending}
      onClick={this.deleteCommentsHandler}
    >
      Delete checked comments
        </Button>;

    const formCommentInput = <Form
      key="input-comment"
      onSubmit={this.SumbitHandler}
    >
      <FormItem
        validateStatus={userNameError ? "error" : undefined}
      >
        {getFieldDecorator("comment", {
          rules: [
            { required: true, message: "Please input your comment!" },
            { max: 50, message: "Max length of comment is 50 symbols!" },
          ],
        })(
          <Input
            placeholder="Enter your comment"
            prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
            suffix={sendButton}
          />
        )}
      </FormItem>
    </Form>;

    const listOfComments = <List
      className="comment-list"
      loading={pending}
      itemLayout="horizontal"
      // loadMore={'loadMore'}
      footer={userRole === UserTypeEnums.Admin
        ? [deleteCheckedComments, formCommentInput]
        : userName && formCommentInput
      }
      dataSource={commentsList}
      renderItem={
        userRole === UserTypeEnums.Admin
          ? this.AdminCommentListRender
          : this.UserCommentListRender
      }
    />;

    return <ViewWrapper>
      <Layout>
        {
          userRole === UserTypeEnums.Admin && <Row className="control-row">
            <Col xs={24} sm={{ span: 2, offset: 1 }}>
              <Button
                key="edit"
                className="edit-button"
                onClick={() => this.props.history.push(`/edit/${postId}`)}
              >
                Edit
              </Button>
            </Col>
            <Col xs={24} sm={{ span: 2 }}>
              <Button
                key="delete"
                className="delete-button"
                onClick={() => {
                  this.props.DeletePost(postId);
                  this.props.history.push("/");
                }}
              >
                Delete post
              </Button>
            </Col>
          </Row>
        }
        <Header>
          <h1 className="comment-head">{"title"}</h1>
        </Header>
        <Content>
          <Row className="post-inner-with-image">
            <Col xs={24} sm={{ span: 20, offset: 2 }}>
              {
                imgUrl && <Card
                  className="card-image"
                  cover={<img alt="logo" src={imgUrl} />}
                />
              }
              {context.split("\n")[0]}
            </Col>
          </Row>
          <Row className="post-inner">
            <Col xs={24} sm={{ span: 20, offset: 2 }} style={{ whiteSpace: "pre-wrap" }}>
              {context.substr(context.indexOf("\n") + 1)}
            </Col>
          </Row>
        </Content>
        <Footer>
          {listOfComments}
        </Footer>
      </Layout>
    </ViewWrapper>;
  }
}

export const ViewForm = Form.create({})(View);
