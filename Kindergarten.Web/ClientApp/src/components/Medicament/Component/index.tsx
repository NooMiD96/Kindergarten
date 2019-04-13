import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin } from "@core/antd";
import Table from "./Table";

import { TState, TComponentState, SendTypeEnum } from "@components/Medicament/TMedicament";
import { IMedicament } from "../State";

export class Medicament extends React.Component<TState, TComponentState> {
  state: TComponentState = {
    lastCreateIndex: -1,
    editList: [],
    deleteList: [],
    lastSendedType: SendTypeEnum.Default,
  };

  componentDidMount() {
    this.props.getMedicamentList();
  }

  componentDidUpdate(prevProp: TState) {
    const { pending, errorInner } = this.props;

    if (prevProp.pending && !pending && !errorInner) {
      const { lastSendedType } = this.state;

      if (lastSendedType === SendTypeEnum.Edit) {
        this.setState({
          editList: [],
          lastSendedType: SendTypeEnum.Default,
        });
      } else if (lastSendedType === SendTypeEnum.Delete) {
        this.setState({
          deleteList: [],
          lastSendedType: SendTypeEnum.Default,
        });
      } else {
        this.setState({
          lastSendedType: SendTypeEnum.Default,
        });
      }
    }
  }

  updateChangeMedicamentList = (medicament: IMedicament) => {
    const { editList } = this.state;
    // tslint:disable-next-line
    if (editList.findIndex(x => x.medicamentId == medicament.medicamentId) === -1) {
      this.setState({
        editList: [...editList, medicament],
      });
    }
  }

  changeMedicamentList = () => {
    this.props.changeMedicamentList(this.state.editList);
    this.setState({
      lastSendedType: SendTypeEnum.Edit,
    });
  }

  updateSelectedDeleteList = (selectedRowIdList: string[]) => {
    this.setState({ deleteList: selectedRowIdList });
  }

  deleteMedicamentList = () => {
    this.props.deleteMedicamentList(this.state.deleteList);
    this.setState({
      lastSendedType: SendTypeEnum.Delete,
    });
  }

  addNewMedicament = () => {
    const { lastCreateIndex } = this.state;
    const medicament = { medicamentId: lastCreateIndex } as IMedicament;

    this.props.addNewMedicament(medicament);
    this.updateChangeMedicamentList(medicament);
    this.setState({ lastCreateIndex: this.state.lastCreateIndex - 1 });
  }

  render() {
    const { errorInner, cleanErrorInner, medicamentList, pending } = this.props;
    const { editList, deleteList, lastCreateIndex } = this.state;

    return (
      <React.Fragment>
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
          <Table
            addNewMedicament={this.addNewMedicament}
            updateChangeMedicamentList={this.updateChangeMedicamentList}
            enableChange={!!editList.length}
            changeMedicamentList={this.changeMedicamentList}
            enableDelete={!!deleteList.length}
            deleteMedicamentList={this.deleteMedicamentList}

            lastCreateIndex={lastCreateIndex}
            medicamentList={medicamentList}
            updateSelectedDeleteList={this.updateSelectedDeleteList}
          />
        </Spin>
      </React.Fragment>
    );
  }
}
