import * as React from "react";
import * as moment from "moment";

import {
  Input,
  Form,
  Button,
  Icon,
  Typography,
  Checkbox,
} from "@core/antd";

import { DatePicker } from "@core/antd/DatePicker";
import { hasErrors } from "@core/antd/Form";
import { text, placeholderText } from "./Text";

import { IChildren, IChildrenInformation } from "@components/Children/State";
import { FormComponentProps } from "@core/antd/Form";

const { Text } = Typography;
const FormItem = Form.Item;

type TProp = {
  children: IChildren | null;
  submitChange: (children: IChildren) => void;
  cancelEdit: () => void;
} & FormComponentProps;

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
      firstName = "",
      secondName = "",
      childrenInformation = {} as IChildrenInformation,
    } = children!;

    const {
      fatherName = "",
      address = "",
      birthday = new Date(),
      male = true,
      phoneNumber = "",
      phoneNumber2 = "",
      firstVaccination = false,
      approveFirstVaccination = false,
      secondVaccination = false,
      approveSecondVaccination = false,
      thirdVaccination = false,
      approveThirdVaccination = false,
      fourthVaccination = false,
      approveFourthVaccination = false,
    } = childrenInformation;

    return (
      <React.Fragment>
        <Form onSubmit={this.sumbitHandler}>
          <FormItem
            validateStatus={firstNameError ? "error" : undefined}
            label={text.firstName}
          >
            {getFieldDecorator("firstName", {
              initialValue: firstName,
              rules: [{ required: true, message: placeholderText.firstName }],
            })(
              <Input
                placeholder={placeholderText.firstName}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

          <FormItem
            validateStatus={secondNameError ? "error" : undefined}
            label={text.secondName}
          >
            {getFieldDecorator("secondName", {
              initialValue: secondName,
              rules: [{ required: true, message: placeholderText.secondName }],
            })(
              <Input
                placeholder={placeholderText.secondName}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

          <FormItem
            validateStatus={fatherNameError ? "error" : undefined}
            label={text.fatherName}
          >
            {getFieldDecorator("fatherName", {
              initialValue: fatherName,
              rules: [{ required: true, message: placeholderText.fatherName }],
            })(
              <Input
                placeholder={placeholderText.fatherName}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

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
              />
            )}
          </FormItem>

          <FormItem
            label={text.male}
          >
            {getFieldDecorator("male", {
              initialValue: male,
              valuePropName: "checked",
            })(
              <Checkbox />
            )}
          </FormItem>

          <FormItem
            validateStatus={phoneNumberError ? "error" : undefined}
            label={text.phoneNumber}
          >
            {getFieldDecorator("phoneNumber", {
              initialValue: phoneNumber,
              rules: [{ required: true, message: placeholderText.phoneNumber }],
            })(
              <Input
                placeholder={placeholderText.phoneNumber}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

          <FormItem
            label={text.phoneNumber2}
          >
            {getFieldDecorator("phoneNumber2", {
              initialValue: phoneNumber2,
            })(
              <Input
                placeholder={placeholderText.phoneNumber2}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

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
            <Text>
              Закончить
            </Text>
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create({})(ChildrenCard);
