import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Button, Row, Col } from "@core/antd";
import Transfer from "@core/antd/Transfer";
import { LocaleDatePicker } from "@core/antd/DatePicker";
import * as moment from "moment";
import "moment/locale/ru";

import { TState, TComponentState } from "@components/Visitation/TVisitation";
import { IVisitation } from "@components/Visitation/State";
import VisitationWrapper from "./style/Visitation.style";
import { Text } from "@src/core/antd/Typography";

export class Visitation extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    date: moment(),
  };

  componentDidMount() {
    this.props.getVisitationList();
  }

  changeVisitationDate = (date: moment.Moment) => {
    this.setState({
      date,
    }, () => this.props.getVisitationList(this.state.date.format("YYYY-MM-DD")));
  }

  saveVisitation = () => {
    const newVisitationList: IVisitation[] = [];
    const { visitationList, targetVisitationKeys, targetDiseasedKeys } = this.props;
    const { date } = this.state;

    visitationList.forEach(x => {
      let visitation: IVisitation = {
        visitationId: 0,
        childrenId: x.childrenId,
        date,
        visited: false,
        diseased: false,
        children: {} as any,
      };

      if (targetVisitationKeys.includes(x.childrenId.toString())) {
        visitation.visited = true;
      } else if (targetDiseasedKeys.includes(x.childrenId.toString())) {
        visitation.diseased = true;
      }
      newVisitationList.push(visitation);
    });

    this.props.saveVisitationList(newVisitationList);
  }

  handleKeyChange = (targetKeys: string[]) => {
    this.props.changeTargetList(targetKeys);
  }

  handleDiseasedKeyChange = (targetKeys: string[]) => {
    this.props.changeDiseasedTargetList(targetKeys);
  }

  render() {
    const {
      errorInner,
      cleanErrorInner,
      pending,
      transferVisitationData,
      targetVisitationKeys,
      transferDiseasedData,
      targetDiseasedKeys,
    } = this.props;
    const { date } = this.state;

    return (
      <VisitationWrapper>
        {
          errorInner && <Alert
            message="Error"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        }
        <Spin
          spinning={pending}
        >
          <Row>
            <Col xs={24} sm={24}>
              <Button
                onClick={this.saveVisitation}
                type="primary"
                className="save-button"
              >
                Сохранить
              </Button>

              <LocaleDatePicker
                defaultValue={date}
                onChange={this.changeVisitationDate}
              />
            </Col>

            <Col xs={24} sm={24} xxl={12}>
              <Transfer
                dataSource={transferVisitationData}
                targetKeys={targetVisitationKeys}
                render={item => item.title}
                onChange={this.handleKeyChange}
                listStyle={{
                  width: "40%",
                  height: 500,
                }}
                operationStyle={{
                  maxWidth: "15%",
                }}
                showSearch
                operations={["Присутствовали", "Отсутствовали"]}
                locale={{
                  itemUnit: "",
                  itemsUnit: "",
                  searchPlaceholder: "Поиск",
                }}
              />
            </Col>

            <Col xs={24} sm={24} xxl={12}>
              <Transfer
                dataSource={transferDiseasedData}
                targetKeys={targetDiseasedKeys}
                render={item => item.title}
                onChange={this.handleDiseasedKeyChange}
                showSearch
                listStyle={{
                  width: "40%",
                  height: 500,
                }}
                operationStyle={{
                  maxWidth: "15%",
                }}
                operations={["Болели", "Отсутствовали"]}
                locale={{
                  itemUnit: "",
                  itemsUnit: "",
                  searchPlaceholder: "Поиск",
                }}
              />

            </Col>
          </Row>
        </Spin>
      </VisitationWrapper>
    );
  }
}
