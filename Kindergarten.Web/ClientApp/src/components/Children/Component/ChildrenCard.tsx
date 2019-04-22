import * as React from "react";

import { IChildren, IChildrenInformation } from "@components/Children/State";
import { Text } from "@src/core/antd/Typography";
import ChildrenCardWrapper from "./style/ChildrenCard.style";

type TProp = {
  children: IChildren | null;
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
        <Text>Имя: {firstName}</Text>
        <Text>Фамилия: {secondName}</Text>
        {
          children.childrenInformation && (
            <React.Fragment>
              <Text>Отчество: {fatherName}</Text>
              <Text>Адрес: {address}</Text>
              <Text>Дата рождения: {birthday.toLocaleDateString()}</Text>
              <Text>Пол: {male ? "М" : "Ж"}</Text>
              <Text>Телефон: {phoneNumber}</Text>
              {
                phoneNumber2 && (
                  <React.Fragment>
                    <Text>Телефон: {phoneNumber}</Text>
                  </React.Fragment>
                )
              }
              <Text>Первыя прививка разрешена: {this.boolValueParser(firstVaccination)}</Text>
              <Text>Первая прививка сделана: {this.boolValueParser(approveFirstVaccination)}</Text>
              <Text>Вторая прививка разрешена: {this.boolValueParser(secondVaccination)}</Text>
              <Text>Вторая прививка сделана: {this.boolValueParser(approveSecondVaccination)}</Text>
              <Text>Третья прививка разрешена: {this.boolValueParser(thirdVaccination)}</Text>
              <Text>Третья прививка сделана: {this.boolValueParser(approveThirdVaccination)}</Text>
              <Text>Четвёртая прививка разрешена: {this.boolValueParser(fourthVaccination)}</Text>
              <Text>Четвёртая прививка сделана: {this.boolValueParser(approveFourthVaccination)}</Text>
            </React.Fragment>
          )
        }
      </ChildrenCardWrapper>
    );
  }
}

export default ChildrenCard;
