import * as React from "react";
import * as moment from "moment";

import {
  Input,
  Form,
  Button,
  Icon,
  Typography,
  Checkbox,
  Row,
  Col,
  Select,
} from "@core/antd";

import { DatePicker, locale } from "@core/antd/DatePicker";
import "moment/locale/ru";

import { hasErrors } from "@core/antd/Form";
import { text, placeholderText } from "./Text";

import { IChildren, IChildrenInformation } from "@components/Children/State";
import { FormComponentProps } from "@core/antd/Form";
import { TextArea } from "@src/core/antd/Input";

const { Text } = Typography;
const FormItem = Form.Item;

type TProp = {
  children: IChildren | null;
  submitChange: (children: IChildren) => void;
  cancelEdit: () => void;
} & FormComponentProps;

const firstFormItemProps = {
  xs: 24,
  sm: { span: 11 },
};
const secondFormItemProps = {
  xs: 24,
  sm: { span: 11, offset: 2 },
};

export class ChildrenCard extends React.PureComponent<TProp, {}> {
  sumbitHandler = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitChange({
          firstName: values.firstName,
          secondName: values.secondName,
          childrenInformation: { ...values },
        } as IChildren);
      }
    });
  }

  render() {
    const { form, cancelEdit } = this.props;

    const {
      isFieldTouched,
      getFieldError,
      getFieldDecorator,
      getFieldsError,
    } = form;

    const firstNameError = isFieldTouched("firstName") && getFieldError("firstName");
    const secondNameError = isFieldTouched("secondName") && getFieldError("secondName");
    const fatherNameError = isFieldTouched("fatherName") && getFieldError("fatherName");
    const addressError = isFieldTouched("address") && getFieldError("address");
    const birthdayError = isFieldTouched("birthday") && getFieldError("birthday");
    const phoneNumberError = isFieldTouched("phoneNumber") && getFieldError("phoneNumber");

    const {
      children = {} as IChildren,
    } = this.props;

    const {
      firstName,
      secondName,
      childrenInformation = {} as IChildrenInformation,
    } = children!;

    const {
      fatherName,
      address,
      birthday = new Date(),
      male = true,
      phoneNumber,
      phoneNumber2,
      healthGroupId = 2,
      firstVaccination = false,
      approveFirstVaccination = true,
      secondVaccination = false,
      approveSecondVaccination = true,
      thirdVaccination = false,
      approveThirdVaccination = true,
      fourthVaccination = false,
      approveFourthVaccination = true,
      info = "",
    } = childrenInformation;

    return (
      <React.Fragment>
        <Form onSubmit={this.sumbitHandler}>

          <Row>
            <Col {...firstFormItemProps}>
              <FormItem
                validateStatus={firstNameError ? "error" : undefined}
                label={text.firstName}
              >
                {getFieldDecorator("firstName", {
                  initialValue: firstName,
                  rules: [{ required: true, message: placeholderText.firstName, pattern: /^[a-zA-Zа-яА-ЯёЁ]*$/ }],
                })(
                  <Input
                    placeholder={placeholderText.firstName}
                    prefix={<Icon type="tag" className="input-icon" />}
                  />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                validateStatus={secondNameError ? "error" : undefined}
                label={text.secondName}
              >
                {getFieldDecorator("secondName", {
                  initialValue: secondName,
                  rules: [{ required: true, message: placeholderText.secondName, pattern: /^[a-zA-Zа-яА-ЯёЁ]*$/ }],
                })(
                  <Input
                    placeholder={placeholderText.secondName}
                    prefix={<Icon type="tag" className="input-icon" />}
                  />
                )}
              </FormItem>
            </Col>

            <Col {...firstFormItemProps}>
              <FormItem
                validateStatus={fatherNameError ? "error" : undefined}
                label={text.fatherName}
              >
                {getFieldDecorator("fatherName", {
                  initialValue: fatherName,
                  rules: [{ required: true, message: placeholderText.fatherName, pattern: /^[a-zA-Zа-яА-ЯёЁ]*$/ }],
                })(
                  <Input
                    placeholder={placeholderText.fatherName}
                    prefix={<Icon type="tag" className="input-icon" />}
                  />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                validateStatus={addressError ? "error" : undefined}
                label={text.address}
              >
                {getFieldDecorator("address", {
                  initialValue: address,
                  rules: [{ required: true, message: placeholderText.address }],
                })(
                  <Input
                    placeholder={placeholderText.address}
                    prefix={<Icon type="tag" className="input-icon" />}
                  />
                )}
              </FormItem>
            </Col>

            <Col xs={24} sm={{ span: 5 }}>
              <FormItem
                validateStatus={birthdayError ? "error" : undefined}
                label={text.birthday}
              >
                {getFieldDecorator("birthday", {
                  initialValue: moment(birthday),
                  rules: [{ required: true, message: placeholderText.birthday }],
                })(
                  <DatePicker
                    placeholder={placeholderText.birthday}
                    locale={locale}
                  />
                )}
              </FormItem>
            </Col>

            <Col xs={24} sm={{ span: 5, offset: 8 }}>
              <FormItem
                label={"Пол"}
              >
                {getFieldDecorator("male", {
                  initialValue: male,
                })(
                  <Select placeholder="Выберите пол">
                    <Select.Option value={true}>Мальчик</Select.Option>
                    <Select.Option value={false}>Девочка</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col xs={24} sm={{ span: 5, offset: 1 }}>
              <FormItem
                label={"Группа здоровья"}
              >
                {getFieldDecorator("healthGroupId", {
                  initialValue: healthGroupId,
                })(
                  <Select placeholder="Выберите группу здоровья">
                    <Select.Option value={1}>I</Select.Option>
                    <Select.Option value={2}>II</Select.Option>
                    <Select.Option value={3}>III</Select.Option>
                    <Select.Option value={4}>IV</Select.Option>
                    <Select.Option value={5}>V</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col {...firstFormItemProps}>
              <FormItem
                validateStatus={phoneNumberError ? "error" : undefined}
                label={text.phoneNumber}
              >
                {getFieldDecorator("phoneNumber", {
                  initialValue: phoneNumber,
                  rules: [{ required: true, message: placeholderText.phoneNumber, pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ }],
                })(
                  <Input
                    placeholder={placeholderText.phoneNumber}
                    prefix={<Icon type="tag" className="input-icon" />}
                  />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                label={text.phoneNumber2}
              >
                {getFieldDecorator("phoneNumber2", {
                  initialValue: phoneNumber2,
                  rules: [{ message: placeholderText.phoneNumber, pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ }],
                })(
                  <Input
                    placeholder={placeholderText.phoneNumber2}
                    prefix={<Icon type="tag" className="input-icon" />}
                  />
                )}
              </FormItem>
            </Col>

            <Col {...firstFormItemProps}>
              <FormItem
                label={text.firstVaccination}
              >
                {getFieldDecorator("firstVaccination", {
                  initialValue: firstVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                label={text.approveFirstVaccination}
              >
                {getFieldDecorator("approveFirstVaccination", {
                  initialValue: approveFirstVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...firstFormItemProps}>
              <FormItem
                label={text.secondVaccination}
              >
                {getFieldDecorator("secondVaccination", {
                  initialValue: secondVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                label={text.approveSecondVaccination}
              >
                {getFieldDecorator("approveSecondVaccination", {
                  initialValue: approveSecondVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...firstFormItemProps}>
              <FormItem
                label={text.thirdVaccination}
              >
                {getFieldDecorator("thirdVaccination", {
                  initialValue: thirdVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                label={text.approveThirdVaccination}
              >
                {getFieldDecorator("approveThirdVaccination", {
                  initialValue: approveThirdVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...firstFormItemProps}>
              <FormItem
                label={text.fourthVaccination}
              >
                {getFieldDecorator("fourthVaccination", {
                  initialValue: fourthVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col {...secondFormItemProps}>
              <FormItem
                label={text.approveFourthVaccination}
              >
                {getFieldDecorator("approveFourthVaccination", {
                  initialValue: approveFourthVaccination,
                  valuePropName: "checked",
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>

            <Col xs={24} sm={24}>
              <FormItem
                label={"Дополнительная информация"}
              >
                {getFieldDecorator("info", {
                  initialValue: info,
                })(
                  <TextArea
                    autosize={{ minRows: 4, maxRows: 14 }}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            onClick={this.sumbitHandler}
            disabled={hasErrors(getFieldsError())}
          >
            <Text>
              Сохранить
            </Text>
          </Button>
          <Button
            onClick={cancelEdit}
          >
            <Text>Закончить</Text>
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create({})(ChildrenCard);
