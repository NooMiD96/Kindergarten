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

  addToEditList = (id: number | null, value?: string) => {
    if (typeof (id) !== "number" || isNaN(id)) {
      return;
    }

    const { editList } = this.state;
    const lastCreateIndex = this.state.lastCreateIndex + 1;

    // if new symptom is empty delete his
    if (!value && id === lastCreateIndex) {
      /**
       * Probably this block doesn't need
       * 'cause element isn't already added in 'EditList'
       */
      // const index = EditList.indexOf({medicamentId: id, name: ''});
      // this.setState({
      //     EditList: EditList.slice(0, index).concat(EditList.slice(index + 1))
      // });

      this.props.deleteMedicament(id);
      return;
    } else if (!value) {
      return;
    }

    const indexOfElemInEditList = editList.findIndex((value: IMedicament) => value.medicamentId === id);

    if (indexOfElemInEditList !== -1) {
      editList.splice(indexOfElemInEditList, 1);
    }

    const newMedicament = {
      medicamentId: id,
      name: value,
    } as IMedicament;

    editList.push(newMedicament);

    // set new value to render
    this.props.setNewValue(newMedicament);
  }

  changeMedicamentList = () => {
    this.props.changeMedicamentList(this.state.editList);
    this.setState({
      lastSendedType: SendTypeEnum.Edit,
    });
  }

  updateSelectedDeleteList = (selectedRowKeys: any) => {
    this.setState({ deleteList: selectedRowKeys });
  }

  deleteMedicamentList = () => {
    this.props.deleteMedicamentList(this.state.deleteList);
    this.setState({
      lastSendedType: SendTypeEnum.Delete,
    });
  }

  addNewMedicament = () => {
    const { lastCreateIndex } = this.state;

    this.props.addNewMedicament({ medicamentId: lastCreateIndex } as IMedicament);
    this.setState({ lastCreateIndex: this.state.lastCreateIndex - 1 });
  }

  render() {
    const { errorInner, cleanErrorInner, medicamentList, pending } = this.props;
    const { editList, deleteList } = this.state;
debugger;
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
            enableChange={!!this.state.editList.length}
            changeMedicamentList={this.changeMedicamentList}
            enableDelete={!!this.state.deleteList.length}
            deleteMedicamentList={this.deleteMedicamentList}

            lastCreateIndex={this.state.lastCreateIndex}
            medicamentList={this.props.medicamentList}
            addToEditList={this.addToEditList}
            updateSelectedDeleteList={this.updateSelectedDeleteList}
          />
        </Spin>
      </React.Fragment>
    );
  }
}
