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
} & FormComponentProps;

export class ChildrenCard extends React.PureComponent<TProp, {}> {
  componentDidMount() {
    this.updateForm();
  }

  componentDidUpdate(prevProps: TProp) {
    if (prevProps.children === null && this.props.children !== null) {
      this.updateForm();
    }
  }

  updateForm = () => {
    const {
      form,
      children = {} as IChildren,
    } = this.props;

    const {
      firstName = "",
      secondName = "",
      childrenInformation = {} as IChildrenInformation,
    } = children!;

    const {
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

    form.setFieldsValue({
      firstName,
      secondName,
      address,
      birthday: moment(birthday),
      male,
      phoneNumber,
      phoneNumber2,
      firstVaccination,
      approveFirstVaccination,
      secondVaccination,
      approveSecondVaccination,
      thirdVaccination,
      approveThirdVaccination,
      fourthVaccination,
      approveFourthVaccination,
    });
  }

  sumbitHandler = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitChange(values);
      }
    });
  }

  render() {
    const { form } = this.props;

    const {
      isFieldTouched,
      getFieldError,
      getFieldDecorator,
      getFieldsError,
    } = form;

    const firstNameError = isFieldTouched("firstName") && getFieldError("firstName");
    const secondNameError = isFieldTouched("secondName") && getFieldError("secondName");
    const addressError = isFieldTouched("address") && getFieldError("address");
    const birthdayError = isFieldTouched("birthday") && getFieldError("birthday");
    const maleError = isFieldTouched("male") && getFieldError("male");
    const phoneNumberError = isFieldTouched("phoneNumber") && getFieldError("phoneNumber");
    const phoneNumber2Error = isFieldTouched("phoneNumber2") && getFieldError("phoneNumber2");
    const firstVaccinationError = isFieldTouched("firstVaccination") && getFieldError("firstVaccination");
    const approveFirstVaccinationError = isFieldTouched("approveFirstVaccination") && getFieldError("approveFirstVaccination");
    const secondVaccinationError = isFieldTouched("secondVaccination") && getFieldError("secondVaccination");
    const approveSecondVaccinationError = isFieldTouched("approveSecondVaccination") && getFieldError("approveSecondVaccination");
    const thirdVaccinationError = isFieldTouched("thirdVaccination") && getFieldError("thirdVaccination");
    const approveThirdVaccinationError = isFieldTouched("approveThirdVaccination") && getFieldError("approveThirdVaccination");
    const fourthVaccinationError = isFieldTouched("fourthVaccination") && getFieldError("fourthVaccination");
    const approveFourthVaccinationError = isFieldTouched("approveFourthVaccination") && getFieldError("approveFourthVaccination");

    return (
      <React.Fragment>
        <Form onSubmit={this.sumbitHandler}>
          <FormItem
            validateStatus={firstNameError ? "error" : undefined}
            label={text.firstName}
          >
            {getFieldDecorator("firstName", {
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
              rules: [{ required: true, message: placeholderText.secondName }],
            })(
              <Input
                placeholder={placeholderText.secondName}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

          <FormItem
            validateStatus={addressError ? "error" : undefined}
            label={text.address}
          >
            {getFieldDecorator("address", {
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
              rules: [{ required: true, message: placeholderText.birthday }],
            })(
              <DatePicker
                placeholder={placeholderText.birthday}
              />
            )}
          </FormItem>

          <FormItem
            validateStatus={maleError ? "error" : undefined}
            label={text.male}
          >
            {getFieldDecorator("male", {
              rules: [{ required: true, message: placeholderText.male }],
            })(
              <Checkbox />
            )}
          </FormItem>

          <FormItem
            validateStatus={phoneNumberError ? "error" : undefined}
            label={text.phoneNumber}
          >
            {getFieldDecorator("phoneNumber", {
              rules: [{ required: true, message: placeholderText.phoneNumber }],
            })(
              <Input
                placeholder={placeholderText.phoneNumber}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

          <FormItem
            validateStatus={phoneNumber2Error ? "error" : undefined}
            label={text.phoneNumber2}
          >
            {getFieldDecorator("phoneNumber2", {
              rules: [{ required: true, message: placeholderText.phoneNumber2 }],
            })(
              <Input
                placeholder={placeholderText.phoneNumber2}
                prefix={<Icon type="tag" className="input-icon" />}
              />
            )}
          </FormItem>

          <FormItem
            validateStatus={firstVaccinationError ? "error" : undefined}
            label={text.firstVaccination}
          >
            {getFieldDecorator("firstVaccination", {
              rules: [{ required: true, message: placeholderText.firstVaccination }],
            })(
              <Checkbox />
            )}
          </FormItem>
          <FormItem
            validateStatus={approveFirstVaccinationError ? "error" : undefined}
            label={text.approveFirstVaccination}
          >
            {getFieldDecorator("approveFirstVaccination", {
              rules: [{ required: true, message: placeholderText.approveFirstVaccination }],
            })(
              <Checkbox />
            )}
          </FormItem>

          <FormItem
            validateStatus={secondVaccinationError ? "error" : undefined}
            label={text.secondVaccination}
          >
            {getFieldDecorator("secondVaccination", {
              rules: [{ required: true, message: placeholderText.male }],
            })(
              <Checkbox />
            )}
          </FormItem>
          <FormItem
            validateStatus={approveSecondVaccinationError ? "error" : undefined}
            label={text.approveSecondVaccination}
          >
            {getFieldDecorator("approveSecondVaccination", {
              rules: [{ required: true, message: placeholderText.male }],
            })(
              <Checkbox />
            )}
          </FormItem>

          <FormItem
            validateStatus={thirdVaccinationError ? "error" : undefined}
            label={text.thirdVaccination}
          >
            {getFieldDecorator("thirdVaccination", {
              rules: [{ required: true, message: placeholderText.male }],
            })(
              <Checkbox />
            )}
          </FormItem>
          <FormItem
            validateStatus={approveThirdVaccinationError ? "error" : undefined}
            label={text.approveThirdVaccination}
          >
            {getFieldDecorator("approveThirdVaccination", {
              rules: [{ required: true, message: placeholderText.male }],
            })(
              <Checkbox />
            )}
          </FormItem>

          <FormItem
            validateStatus={fourthVaccinationError ? "error" : undefined}
            label={text.fourthVaccination}
          >
            {getFieldDecorator("fourthVaccination", {
              rules: [{ required: true, message: placeholderText.male }],
            })(
              <Checkbox />
            )}
          </FormItem>
          <FormItem
            validateStatus={approveFourthVaccinationError ? "error" : undefined}
            label={text.approveFourthVaccination}
          >
            {getFieldDecorator("approveFourthVaccination", {
              rules: [{ required: true, message: placeholderText.male }],
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
              Опубликовать
              </Text>
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create({})(ChildrenCard);
