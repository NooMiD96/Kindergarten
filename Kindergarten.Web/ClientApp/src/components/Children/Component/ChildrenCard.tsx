import * as React from "react";

import { IChildren, IChildrenInformation } from "@components/Children/State";
import { Text } from "@src/core/antd/Typography";
import { Row, Col, Divider } from "@src/core/antd";
import ChildrenCardWrapper from "./style/ChildrenCard.style";

type TProp = {
  children: IChildren | null;
};

const labelProps = {
  xs: 24,
  sm: 12,
  xl: 8,
  className: "label-text",
};

const valueProps = {
  xs: 24,
  sm: 12,
  xl: 16,
  className: "label-value",
};

export class ChildrenCard extends React.Component<TProp, {}> {
  boolValueParser = (val: boolean) => val ? "Да" : "Нет";

  render() {
    const { children } = this.props;
    if (children === null) {
      return <Text>Информация отсутствует.</Text>;
    }

    const {
      firstName,
      secondName,
      childrenInformation = {} as IChildrenInformation,
    } = children;

    const {
      address,
      birthday,
      fatherName,
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
    } = childrenInformation;

    return (
      <ChildrenCardWrapper>
        <Row>
          <Col {...labelProps}><Text>Имя: </Text></Col>
          <Col {...valueProps}><Text>{firstName}</Text></Col>
          <Divider />

          <Col {...labelProps}><Text>Фамилия: </Text></Col>
          <Col {...valueProps}><Text>{secondName}</Text></Col>
          <Divider />

          {
            children.childrenInformation && (
              <React.Fragment>
                <Col {...labelProps}><Text>Отчество: </Text></Col>
                <Col {...valueProps}><Text>{fatherName}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Адрес: </Text></Col>
                <Col {...valueProps}><Text>{address}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Дата рождения: </Text></Col>
                <Col {...valueProps}><Text>{birthday.toLocaleDateString()}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Пол: </Text></Col>
                <Col {...valueProps}><Text>{male ? "М" : "Ж"}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Телефон: </Text></Col>
                <Col {...valueProps}><Text>{phoneNumber}</Text></Col>
                <Divider />

                {
                  phoneNumber2 && (
                    <React.Fragment>
                      <Col {...labelProps}><Text>Телефон: </Text></Col>
                      <Col {...valueProps}><Text>{phoneNumber}</Text></Col>
                      <Divider />
                    </React.Fragment>
                  )
                }
                <Col {...labelProps}><Text>Первая прививка сделана: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(firstVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Первыя прививка разрешена: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(approveFirstVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Вторая прививка сделана: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(secondVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Вторая прививка разрешена: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(approveSecondVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Третья прививка сделана: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(thirdVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Третья прививка разрешена: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(approveThirdVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Четвёртая прививка сделана: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(fourthVaccination)}</Text></Col>
                <Divider />

                <Col {...labelProps}><Text>Четвёртая прививка разрешена: </Text></Col>
                <Col {...valueProps}><Text>{this.boolValueParser(approveFourthVaccination)}</Text></Col>
              </React.Fragment>
            )
          }
        </Row>
      </ChildrenCardWrapper>
    );
  }
}

export default ChildrenCard;
