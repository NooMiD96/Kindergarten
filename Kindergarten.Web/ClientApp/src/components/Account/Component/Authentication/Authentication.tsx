import * as React from "react";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Form, { FormItem, FormComponentProps } from "@core/antd/Form";

import ModalControlButtons from "../ModalControlButtons";

import { TAuthenticationModel } from "../../TAccount";

interface Props extends FormComponentProps {
  handleSubmit: (payload: TAuthenticationModel) => void;
  handleСlose: () => void;
  loading: boolean;
}

export class Authentication extends React.Component<Props, {}> {
  onSubmit = () => {
    this.props.form.validateFields((err: any, values: TAuthenticationModel) => {
      if (!err) {
        this.props.handleSubmit({
          password: values.password,
          userName: values.userName,
        });
        this.props.form.resetFields(["password"]);
      }
    });
  }

  onClose = () => {
    this.props.form.resetFields();
    this.props.handleСlose();
  }

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <FormItem
          label="User Name"
        >
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your User Name!" }],
          })(
            <Input
              prefix={<Icon type="user" className="input-prefix-color" />}
              placeholder="User Name"
              onPressEnter={this.onSubmit}
            />
          )}
        </FormItem>
        <FormItem
          label="Password"
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" className="input-prefix-color" />}
              type="password"
              placeholder="Password"
              onPressEnter={this.onSubmit}
            />
          )}
        </FormItem>
        <div className="ant-modal-footer">
          <ModalControlButtons
            handleSubmit={this.onSubmit}
            handleCancel={this.onClose}
            loading={loading}
            returnTitle="Return"
            submitTitle="Login"
          />
        </div>
      </Form>
    );
  }
}
