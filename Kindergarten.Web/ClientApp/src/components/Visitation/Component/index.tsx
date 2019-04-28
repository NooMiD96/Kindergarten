import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Button } from "@core/antd";
import Transfer from "@core/antd/Transfer";
import { LocaleDatePicker } from "@core/antd/DatePicker";
import * as moment from "moment";

import { TState, TComponentState } from "@components/Visitation/TVisitation";
import { IVisitation } from "@components/Visitation/State";
import VisitationWrapper from "./style/Visitation.style";

export class Medicament extends React.PureComponent<TState, TComponentState> {
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
    const { visitationList, targetKeys } = this.props;
    const { date } = this.state;

    visitationList.forEach(x => {
      let visitation: IVisitation = {
        visitationId: 0,
        childrenId: x.childrenId,
        date,
        visited: false,
        children: {} as any,
      };

      if (targetKeys.includes(x.childrenId.toString())) {
        visitation.visited = true;
      }
      newVisitationList.push(visitation);
    });

    this.props.saveVisitationList(newVisitationList);
  }

  handleKeyChange = (targetKeys: string[]) => {
    this.props.changeTargetList(targetKeys);
  }

  render() {
    const { errorInner, cleanErrorInner, pending, transferData, targetKeys } = this.props;
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
          <Transfer
            dataSource={transferData}
            targetKeys={targetKeys}
            render={item => item.title}
            onChange={this.handleKeyChange}
            showSearch
            locale={{
              itemUnit: "",
              itemsUnit: "",
              searchPlaceholder: "Поиск",
            }}
          />
        </Spin>
      </VisitationWrapper>
    );
  }
}
