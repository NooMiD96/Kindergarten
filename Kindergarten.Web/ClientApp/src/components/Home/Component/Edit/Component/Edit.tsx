import * as React from "react";

import {
  Layout,
  Input,
  Row,
  Col,
  Form,
  Button,
  Icon,
  Typography,
} from "@core/antd";

import { hasErrors } from "@core/antd/Form";

import { TState, TComponentState } from "../TEdit";
import { UserTypeEnums } from "@core/constants";
import Alert from "@src/core/components/Alert";

import localeText from "./Text";

const { Text } = Typography;

const { Content } = Layout;
const FormItem = Form.Item;

const LayoutStyle = {
  padding: "15px",
};

export class Edit extends React.Component<TState, TComponentState> {
  componentDidMount() {
    const {
      post: {
        postId,
        header,
        imgUrl,
        content,
      },
      userRole,
      history,
      match,
      getPost,
      form,
    } = this.props;

    const { id } = match.params;
    const numberId = Number.parseInt(id, 10);
    if (userRole !== UserTypeEnums.Admin || Number.isNaN(numberId)) {
      history.push("/");
    }
    if (numberId > 0) {
      if (postId !== numberId) {
        getPost(numberId);
      } else {
        form.setFieldsValue({ header, imgUrl, content });
      }
    }
  }

  componentDidUpdate(prevProps: TState) {
    if (prevProps.post.content !== this.props.post.content || prevProps.post.header !== this.props.post.header) {
      this.props.form.setFieldsValue({ header: this.props.post.header, imgUrl: this.props.post.imgUrl, content: this.props.post.content });
    }
    if (prevProps.pending && !this.props.pending && !this.props.errorInner) {
      const numberId = Number.parseInt(this.props.match.params.id, 10);

      if (Number.isNaN(numberId) || numberId <= 0) {
        this.props.getPosts(1, 5);
        this.props.history.push("/");
      } else {
        this.props.getPost(numberId);
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
        this.props.createEditPost(
          Number.parseInt(this.props.match.params.id, 10),
          values.header,
          values.content,
          values.imgUrl
        );
      }
    });
  }

  public render() {
    const { pending, errorInner, cleanErrorInner: CleanErrorInner } = this.props;
    const { isFieldTouched, getFieldError, getFieldDecorator, getFieldsError } = this.props.form;

    const headerError = isFieldTouched("header") && getFieldError("header");
    const contentError = isFieldTouched("content") && getFieldError("content");

    return(
      <Layout style={LayoutStyle}>
        <Form onSubmit={this.SumbitHandler}>
          <Content>
            <Row>
              <Col style={{ float: "left" }} xs={24} sm={{ span: 10 }}>
                <FormItem
                  validateStatus={headerError ? "error" : undefined}
                  label={localeText._label_header}
                >
                  {getFieldDecorator("header", {
                    rules: [{ required: true, message: localeText._rules_require_header }],
                  })(
                    <Input
                      placeholder={localeText._label_header}
                      prefix={(
                        <Icon
                          type="tag"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      )}
                    />
                  )}
                </FormItem>
              </Col>
              <Col style={{ float: "left" }} xs={24} sm={{ span: 10, offset: 4 }}>
                <FormItem
                  label={localeText._label_urlImg}
                >
                  {getFieldDecorator("imgUrl", {
                    rules: [{ required: false }],
                  })(
                    <Input
                      placeholder={localeText._label_urlImg}
                      prefix={(
                        <Icon
                          type="paper-clip"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      )}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <FormItem
                  validateStatus={contentError ? "error" : undefined}
                  label={localeText._label_content}
                >
                  {getFieldDecorator("content", {
                    rules: [{ required: true, message: localeText._rules_require_content }],
                  })(
                    <Input.TextArea
                    autosize={{ minRows: 2, maxRows: 12 }}
                    placeholder={localeText._label_content}
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
            <Button
              type="primary"
              htmlType="submit"
              loading={pending}
              onClick={this.SumbitHandler}
              disabled={hasErrors(getFieldsError())}
            >
              <Text>
                Опубликовать
              </Text>
            </Button>
          </Content>
        </Form>
      </Layout>
    );
  }
}

export const EditForm = Form.create({})(Edit);
