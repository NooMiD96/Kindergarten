import * as React from "react";

import Layout from "@core/antd/Layout";
import Input from "@core/antd/Input";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Form from "@core/antd/Form";
import Button from "@core/antd/Button";
import Icon from "@core/antd/Svg";
import { hasErrors } from "@core/antd/Form";

import { TState, TComponentState } from "../TEdit";
import { UserTypeEnums } from "@core/constants";
import Alert from "@src/core/components/Alert";

const { Content } = Layout;
const FormItem = Form.Item;

export class Edit extends React.Component<TState, TComponentState> {
  componentDidMount() {
    const {
      post: {
        postId,
        header,
        imgUrl,
        context,
      },
      userRole,
      history,
      match,
      GetPost,
      form,
    } = this.props;

    const { id } = match.params;
    const numberId = Number.parseInt(id, 10);
    if (userRole !== UserTypeEnums.Admin || Number.isNaN(numberId)) {
      history.push("/");
    }
    if (numberId > 0) {
      if (postId !== numberId) {
        GetPost(numberId);
      } else {
        form.setFieldsValue({ header, imgUrl, context });
      }
    }
  }

  componentDidUpdate(prevProps: TState) {
    if (prevProps.post.context !== this.props.post.context || prevProps.post.header !== this.props.post.header) {
      this.props.form.setFieldsValue({ header: this.props.post.header, imgUrl: this.props.post.imgUrl, context: this.props.post.context });
    }
    if (prevProps.pending && !this.props.pending && !this.props.errorInner) {
      const numberId = Number.parseInt(this.props.match.params.id, 10);

      if (Number.isNaN(numberId) || numberId <= 0) {
        this.props.GetPosts(1, 5);
        this.props.history.push("/");
      } else {
        this.props.GetPost(numberId);
        this.props.history.push(`/post/${this.props.post.postId}`);
      }
    }
  }

  SumbitHandler = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.setState({
        //     loading: true,
        // });
        this.props.CreateEditPost(Number.parseInt(this.props.match.params.id, 10), values.header, values.context, values.imgUrl);
      }
    });
  }

  public render() {
    const { pending, errorInner, CleanErrorInner } = this.props;
    const { isFieldTouched, getFieldError, getFieldDecorator, getFieldsError } = this.props.form;

    const headerError = isFieldTouched("header") && getFieldError("header");
    const contentError = isFieldTouched("content") && getFieldError("content");

    return <div>
      <Layout>
        <Form
          onSubmit={this.SumbitHandler}
        >
          <Content>

            <Row className="edit-header-image">
              <Col style={{ float: "left" }} xs={24} sm={{ span: 10 }}>
                <FormItem
                  validateStatus={headerError ? "error" : undefined}
                  label={"Header"}
                >
                  {getFieldDecorator("header", {
                    rules: [{ required: true, message: "Please input your comment!" }],
                  })(
                    <Input
                      placeholder="Enter header of post"
                      prefix={<Icon type="tag" style={{ color: "rgba(0,0,0,.25)" }} />}
                    />
                  )}
                </FormItem>
              </Col>
              <Col style={{ float: "left" }} xs={24} sm={{ span: 10, offset: 4 }}>
                <FormItem
                  label={"Url to image"}
                >
                  {getFieldDecorator("imgUrl", {
                    rules: [{ required: false, message: "Please input your comment!" }],
                  })(
                    <Input
                      placeholder="Enter url to image"
                      prefix={<Icon type="tag-o" style={{ color: "rgba(0,0,0,.25)" }} />}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row className="edit-context">
              <Col span={24}>
                <FormItem
                  validateStatus={contentError ? "error" : undefined}
                  label={"Context"}
                >
                  {getFieldDecorator("context", {
                    rules: [{ required: true, message: "Please input your comment!" }],
                  })(
                    <Input.TextArea
                      autosize={{ minRows: 2, maxRows: 12 }}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            {
              errorInner && <Alert
                message="Error"
                description={errorInner}
                type="error"
                closable={false}
                style={{ marginBottom: 10 }}
                onClose={CleanErrorInner}
              />
            }
            <Button type="primary"
              htmlType="submit"
              loading={pending}
              onClick={this.SumbitHandler}
              disabled={hasErrors(getFieldsError())}
            >
              Apply
            </Button>
          </Content>
        </Form>
      </Layout>
    </div>;
  }
}

export const EditForm = Form.create({})(Edit);
